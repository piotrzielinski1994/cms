import { ButtonLink } from '@/components/basic/button/button';
import { Image } from '@/components/basic/image/image';
import { placeholderDarkWebp } from '@/placeholders';
import { cn } from '@/utils/tailwind';
import { HTMLAttributes } from 'react';

type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
  product: {
    id: number;
    slug: string;
    name: string;
    price: string;
  };
};

const ProductCard = ({ product, className, ...props }: ProductCardProps) => {
  return (
    <div {...props} className={cn('grid gap-2 justify-items-start', 'bg-background1', className)}>
      <Image src={placeholderDarkWebp.src} alt="product" />
      <div className="grid">
        <h2 className="">{product.name}</h2>
        <span className="">{product.price}</span>
      </div>
      <ButtonLink href={`/test/products/${product.slug}`}>Buy Now</ButtonLink>
    </div>
  );
};

export { ProductCard };
