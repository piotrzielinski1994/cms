import payloadConfig from '@/payload/payload.config';
import { Product, Variant, VariantOption, VariantType } from '@/payload/payload.types';
import { getPayload } from 'payload';
import { Purchase } from './purchase';

type PurchaseContainerProps = {
  product: Product;
};

const isVariantType = (item: string | VariantType): item is VariantType =>
  typeof item === 'object' && item !== null;

const isVariantOption = (item: string | VariantOption | null | undefined): item is VariantOption =>
  typeof item === 'object' && item !== null;

const PurchaseContainer = async ({ product }: PurchaseContainerProps) => {
  if (!product.enableVariants || !product.variantTypes?.length) {
    return (
      <Purchase
        productId={String(product.id)}
        groups={[]}
        variants={[]}
        valueToOptionId={{}}
      />
    );
  }

  const payload = await getPayload({ config: payloadConfig });

  const variantTypeIds = product.variantTypes
    .map((vt) => (typeof vt === 'object' ? vt.id : vt))
    .filter((id): id is string => typeof id === 'string');

  const [optionsResult, variantsResult] = await Promise.all([
    payload.find({
      collection: 'variantOptions',
      where: { variantType: { in: variantTypeIds } },
      pagination: false,
      depth: 1,
    }),
    payload.find({
      collection: 'variants',
      where: { product: { equals: product.id } },
      pagination: false,
      depth: 1,
    }),
  ]);

  const variantTypes = product.variantTypes.filter(isVariantType);
  const optionsByType = new Map<string, VariantOption[]>();
  optionsResult.docs.forEach((opt) => {
    const typeId = typeof opt.variantType === 'object' ? opt.variantType.id : opt.variantType;
    if (!optionsByType.has(typeId)) optionsByType.set(typeId, []);
    optionsByType.get(typeId)!.push(opt);
  });

  const variants: Variant[] = variantsResult.docs;

  const groups = variantTypes.map((vt) => ({
    name: vt.name,
    label: vt.label,
    options: (optionsByType.get(vt.id) ?? []).map((opt) => ({
      label: opt.label,
      value: opt.value,
    })),
  }));

  const optionIdByValue = new Map<string, string>();
  optionsResult.docs.forEach((opt) => {
    const typeName =
      typeof opt.variantType === 'object' ? opt.variantType.name : undefined;
    if (typeName) optionIdByValue.set(`${typeName}:${opt.value}`, opt.id);
  });

  const variantsForClient = variants.map((v) => ({
    id: v.id,
    optionIds: (v.options ?? [])
      .map((opt) => (isVariantOption(opt) ? opt.id : (opt as string)))
      .filter((id): id is string => typeof id === 'string'),
  }));

  const valueToOptionId: Record<string, string> = {};
  optionsResult.docs.forEach((opt) => {
    const typeName = typeof opt.variantType === 'object' ? opt.variantType.name : undefined;
    if (typeName) valueToOptionId[`${typeName}:${opt.value}`] = opt.id;
  });

  return (
    <Purchase
      productId={String(product.id)}
      groups={groups}
      variants={variantsForClient}
      valueToOptionId={valueToOptionId}
    />
  );
};

export { PurchaseContainer };
