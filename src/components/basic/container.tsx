import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, ElementType, forwardRef, Ref } from 'react';

type ElementMap = {
  div: HTMLDivElement;
  dialog: HTMLDialogElement;
};

type ContainerProps<T extends keyof ElementMap = 'div'> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

const Container = forwardRef(
  <T extends keyof ElementMap = 'div'>(props: ContainerProps<T>, ref: Ref<ElementMap[T]>) => {
    const { as: elementTag = 'div', className, ...rest } = props;
    const HtmlTag = elementTag as unknown as ElementType;
    return (
      <HtmlTag
        ref={ref}
        {...rest}
        className={cn('w-full max-w-screen-2xl', 'mx-auto', 'grid', 'cms-container', className)}
      />
    );
  },
);

export { Container };
