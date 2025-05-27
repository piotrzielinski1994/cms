import { optional } from '@/utils/optional';
import { cn } from '@/utils/tailwind';
import { useQueryParams } from '@/utils/url.hooks';

type ProductVariantsGroupProps = {
  label: string;
  name: string;
  id?: string;
  variants: {
    value: string;
    label: string;
  }[];
};

const ProductVariantsGroup = (props: ProductVariantsGroupProps) => {
  const [params, setParams] = useQueryParams({
    [props.name]: { defaultValue: undefined as string | undefined },
  });

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
              'has-[:disabled]:border-foreground/50  has-[:disabled]:text-foreground/50 has-[:disabled]:cursor-not-allowed',
              'focus-within:tw-cms-outline',
              'has-[:checked]:bg-foreground has-[:checked]:text-background',
              'hover:border-foreground/90 hover:has-[:checked]:bg-foreground/90',
            )}
          >
            <input
              type="radio"
              id={optional(props.id, (id) => `${id}__${variant.value}`)}
              value={variant.value}
              name={props.name}
              disabled={variant.value === '0'}
              className="sr-only"
              checked={variant.value === params[props.name]}
              onChange={(e) => setParams({ [props.name]: e.target.value })}
            />
            <span>{variant.label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export { ProductVariantsGroup };
