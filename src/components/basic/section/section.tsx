import { type ElementType, forwardRef } from 'react';
import type {
  PolymorphicComponent,
  PolymorphicProps,
  PolymorphicRef,
} from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

const styles = {
  root: cn('px-4 sm:px-6', 'grid', 'cms-section'),
} as const;

const Section: PolymorphicComponent = forwardRef(
  <T extends ElementType = 'section'>(props: PolymorphicProps<T>, ref: PolymorphicRef<T>) => {
    const { as: Component = 'section', className, ...rest } = props;
    return <Component ref={ref} {...rest} className={cn(styles.root, className)} />;
  },
);

export { Section };
