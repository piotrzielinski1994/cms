import { cn } from '@/_old/utilities/ui';
import { ComponentPropsWithoutRef } from 'react';

type ContainerProps = ComponentPropsWithoutRef<'section'> & {
  as?: keyof HTMLElementTagNameMap;
};

const Container = ({ as: HtmlTag = 'div', children, className, ...rest }: ContainerProps) => {
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
