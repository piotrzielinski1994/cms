import { Image } from '@/components/basic/image/image';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type TestimonialProps = HtmlProps<'figure'> & {
  image: string;
  quote: string;
  name: string;
  annotation?: string;
};

const styles = {
  root: cn('p-4 md:p-6', 'grid grid-cols-[auto_1fr] gap-4', 'bg-background1'),
  quote: 'col-span-2 italic',
  image: 'w-14 h-14 rounded-full',
  content: 'grid content-center',
  name: 'font-semibold',
} as const;

const Testimonial = (props: TestimonialProps) => {
  const { image, quote, name, annotation, className, ...rest } = props;
  return (
    <figure className={cn(styles.root, className)} {...rest}>
      <blockquote className={styles.quote}>
        <p>{quote}</p>
      </blockquote>
      <Image src={image} alt={name} className={styles.image} />
      <figcaption className={styles.content}>
        <span className={styles.name}>{name}</span>
        {annotation && <span>{annotation}</span>}
      </figcaption>
    </figure>
  );
};

export { styles, Testimonial };
