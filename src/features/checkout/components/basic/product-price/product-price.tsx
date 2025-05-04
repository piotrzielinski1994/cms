import { cn } from '@/utils/tailwind';

type ProductPriceProps = {
  current: string;
  last30Days?: string;
  regular?: string;
};

const classNames = {
  strikethrough: cn(
    'underline [text-underline-offset:-35%] [text-decoration-skip-ink:none]',
    'text-foreground/60',
  ),
};

const ProductPrice = (props: ProductPriceProps) => {
  return (
    <div>
      <p aria-current="true" className="text-3xl font-bold text-primary leading-none">
        {props.current}
      </p>
      {props.last30Days !== undefined && (
        <p className="text-sm text-foreground">
          <span>Lowest price in last 30 days: </span>
          <del className={cn(classNames.strikethrough)}>{props.last30Days}</del>
        </p>
      )}
      {props.regular !== undefined && (
        <p className="text-sm text-foreground">
          <span>Regular price: </span>
          <del className={cn(classNames.strikethrough)}>{props.regular}</del>
        </p>
      )}
    </div>
  );
};

export { ProductPrice };
