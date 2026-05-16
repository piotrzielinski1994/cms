'use client';

import { Button } from '@/components/basic/button/button';
import { useQueryParams } from '@/utils/query-params/query-params.hooks';
import { useCart } from '@payloadcms/plugin-ecommerce/client/react';
import { useTranslations } from 'next-intl';
import { fromPairs } from 'ramda';
import { useMemo, useState, useTransition } from 'react';
import { VariantGroupsRadio } from './variant-groups-radio';

type Option = { label: string; value: string };
type Group = { name: string; label: string; options: Option[] };
type VariantSummary = { id: string; optionIds: string[] };

type PurchaseProps = {
  productId: string;
  groups: Group[];
  variants: VariantSummary[];
  valueToOptionId: Record<string, string>;
};

const Purchase = ({ productId, groups, variants, valueToOptionId }: PurchaseProps) => {
  const { addItem } = useCart();
  const t = useTranslations('frontend.product');
  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);

  const queryParamConfig = useMemo(
    () =>
      fromPairs(
        groups.map((g) => [g.name, { defaultValue: undefined as string | undefined }]),
      ) as Record<string, { defaultValue: string | undefined }>,
    [groups],
  );
  const [params, setParams] = useQueryParams(queryParamConfig);
  const selected = params as Record<string, string | undefined>;

  const hasVariants = groups.length > 0;

  const matchingVariant = useMemo(() => {
    if (!hasVariants) return null;
    const selectedOptionIds = groups
      .map((g) => {
        const value = selected[g.name];
        if (!value) return undefined;
        return valueToOptionId[`${g.name}:${value}`];
      })
      .filter((id): id is string => Boolean(id));
    if (selectedOptionIds.length !== groups.length) return null;
    return (
      variants.find((v) => selectedOptionIds.every((optId) => v.optionIds.includes(optId))) ?? null
    );
  }, [selected, groups, variants, hasVariants, valueToOptionId]);

  const isReadyToAdd = !hasVariants || matchingVariant !== null;

  const onSelect = (groupName: string, optionValue: string) => {
    setParams({ [groupName]: optionValue });
  };

  const onAdd = () => {
    if (!isReadyToAdd) return;
    setHasError(false);
    startTransition(async () => {
      try {
        await addItem({ product: productId, variant: matchingVariant?.id }, 1);
      } catch {
        setHasError(true);
      }
    });
  };

  return (
    <div className="grid gap-4 justify-items-start w-full">
      {hasVariants && (
        <VariantGroupsRadio groups={groups} selected={selected} onSelect={onSelect} />
      )}
      <Button onClick={onAdd} disabled={!isReadyToAdd || isPending}>
        {isPending ? t('adding') : !isReadyToAdd ? t('selectVariant') : t('addToCart')}
      </Button>
      {hasError && (
        <p className="text-sm text-red-600" role="alert">
          {t('addToCartError')}
        </p>
      )}
    </div>
  );
};

export { Purchase };
