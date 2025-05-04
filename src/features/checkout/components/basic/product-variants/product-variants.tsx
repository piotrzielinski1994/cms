import { optional } from '@/utils/optional';
import { cn } from '@/utils/tailwind';

type ProductVariantsProps = {
  label: string;
  name: string;
  id?: string;
  variants: {
    value: string;
    label: string;
  }[];
};

const ProductVariants = (props: ProductVariantsProps) => {
  return (
    <div className="grid gap-2">
      <legend>{props.label}</legend>
      <fieldset id={props.id} className="flex gap-2 flex-wrap">
        {props.variants.map((variant) => (
          <label
            key={variant.value}
            className={cn(
              'px-2 py-0.5 cursor-pointer',
              'border border-foreground',
              'hover:bg-background1',
              'has-[:disabled]:cursor-not-allowed has-[:disabled]:border-foreground/50  has-[:disabled]:text-foreground/50',
              'focus-within:tw-cms-focus',
              'has-[:checked]:bg-foreground has-[:checked]:text-background',
            )}
          >
            <input
              type="radio"
              id={optional(props.id, (id) => `${id}__${variant.value}`)}
              value={variant.value}
              name={props.name}
              disabled={variant.value === '0'}
              className="sr-only"
            />
            <span>{variant.label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export { ProductVariants };
