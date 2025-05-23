import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, ElementType } from 'react';

type ContainerProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
};

const Container = <T extends ElementType = 'div'>(props: ContainerProps<T>) => {
  const { as: HtmlTag = 'div', className, children, ...rest } = props;
  return (
    <HtmlTag
      {...rest}
      className={cn('w-full max-w-screen-2xl', 'mx-auto', 'grid', 'cms-container', className)}
    >
      {children}
    </HtmlTag>
  );
};

export { Container };
