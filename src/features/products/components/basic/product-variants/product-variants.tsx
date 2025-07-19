import { ProductVariantsGroup } from '../product-variants-group/product-variants-group';

const variantGroups = Array.from({ length: 2 }, (_, i) => i);
const variants = Array.from({ length: 5 }, (_, i) => i).map((it) => {
  return { value: String(it), label: `Variant ${it}` };
});

const ProductVariants = () => {
  return (
    <div className="grid gap-4">
      {variantGroups.map((group) => {
        return (
          <ProductVariantsGroup
            key={group}
            name={`group-${group}`}
            label={`Variant group ${group}`}
            variants={variants}
          />
        );
      })}
    </div>
  );
};

export { ProductVariants };
