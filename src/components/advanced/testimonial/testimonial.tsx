import { Image } from '@/components/basic/image/image';
import { cn } from '@/utils/tailwind';

type TestimonialProps = {
  image: string;
  quote: string;
  name: string;
  annotation?: string;
};

const Testimonial = (props: TestimonialProps) => {
  return (
    <figure className={cn('p-4 md:p-6', 'grid grid-cols-[auto_1fr] gap-4', 'bg-background1')}>
      <blockquote className="col-span-2 italic">
        <p>{props.quote}</p>
      </blockquote>
      <Image src={props.image} alt={props.name} className="w-14 h-14 rounded-full" />
      <figcaption className="grid content-center">
        <span className="font-semibold">{props.name}</span>
        {props.annotation && <span className="">{props.annotation}</span>}
      </figcaption>
    </figure>
  );
};

export { Testimonial };
