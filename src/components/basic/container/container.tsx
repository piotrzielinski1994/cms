import { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ElementType, forwardRef } from 'react';

const styles = {
  root: cn('w-full max-w-screen-2xl', 'mx-auto', 'grid', 'cms-container'),
} as const;

const Container: PolymorphicComponent = forwardRef(
  <T extends ElementType = 'div'>(props: PolymorphicProps<T>, ref: PolymorphicRef<T>) => {
    const { as: Component = 'div', className, ...rest } = props;
    return <Component ref={ref} {...rest} className={cn(styles.root, className)} />;
  },
);

export { Container };
