import { ButtonLink } from '@/components/basic/button/button';
import { Image } from '@/components/basic/image/image';
import { placeholderDarkWebp } from '@/placeholders';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type ProductCardProps = HtmlProps<'div'> & {
  layout?: 'grid' | 'list';
  product: {
    id: number;
    slug: string;
    name: string;
    price: string;
  };
};

const ProductCard = ({ product, layout = 'grid', className, ...props }: ProductCardProps) => {
  return (
    <div
      {...props}
      className={cn(
        {
          'grid justify-items-start': layout === 'grid',
          'flex items-center': layout === 'list',
        },
        'bg-background1',
        className,
      )}
    >
      <Image src={placeholderDarkWebp.src} alt="product" />
      <div className={cn('p-4 md:p-6', 'grid gap-2')}>
        <div className="">
          <h2 className="">{product.name}</h2>
          <span className="">{product.price}</span>
        </div>
        <ButtonLink href={`/test/products/${product.slug}`}>Buy Now</ButtonLink>
      </div>
    </div>
  );
};

export { ProductCard };
