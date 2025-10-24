import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type HtmlProps<T extends ElementType> = ComponentPropsWithoutRef<T>;

// Overwrite native types and/or add custom props
// prettier-ignore
type EnhancedHtmlProps<
  T extends ElementType,
  U extends Partial<HtmlProps<T>> & Record<string, unknown>
> = U & Omit<HtmlProps<T>, keyof U>;

type HtmlElement<T extends ElementType> = T extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[T]
  : never;

type PolymorphicRef<T extends ElementType> = HtmlProps<T>['ref'];
type PolymorphicProps<T extends ElementType> = { as?: T } & Omit<HtmlProps<T>, 'as'>;
type PolymorphicComponent = <T extends ElementType = 'div'>(
  props: PolymorphicProps<T> & { ref?: PolymorphicRef<T> },
) => ReactNode;

export type {
  EnhancedHtmlProps,
  HtmlElement,
  HtmlProps,
  PolymorphicComponent,
  PolymorphicProps,
  PolymorphicRef,
};
