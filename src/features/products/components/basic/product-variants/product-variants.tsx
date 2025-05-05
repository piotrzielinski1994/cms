import { ProductVariantsGroup } from '../product-variants-group/product-variants-group';

const ProductVariants = () => {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 2 }, (_, i) => i).map((group) => {
        return (
          <ProductVariantsGroup
            key={group}
            name={`group-${group}`}
            label={`Variant group ${group}`}
            variants={Array.from({ length: 5 }, (_, i) => i).map((it) => {
              return { value: String(it), label: `Variant ${it}` };
            })}
          />
        );
      })}
    </div>
  );
};

export { ProductVariants };
