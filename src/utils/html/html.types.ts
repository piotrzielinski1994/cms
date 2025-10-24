import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  ElementType,
  FormHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  JSX,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  OptionHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TdHTMLAttributes,
} from 'react';

type HtmlPropsMap = {
  a: AnchorHTMLAttributes<HTMLAnchorElement>;
  button: ButtonHTMLAttributes<HTMLButtonElement>;
  dialog: HTMLAttributes<HTMLDialogElement>;
  div: HTMLAttributes<HTMLDivElement>;
  form: FormHTMLAttributes<HTMLFormElement>;
  img: ImgHTMLAttributes<HTMLImageElement>;
  input: InputHTMLAttributes<HTMLInputElement>;
  label: LabelHTMLAttributes<HTMLLabelElement>;
  li: LiHTMLAttributes<HTMLLIElement>;
  option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
  p: HTMLAttributes<HTMLParagraphElement>;
  select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
  span: HTMLAttributes<HTMLSpanElement>;
  table: HTMLAttributes<HTMLTableElement>;
  tbody: HTMLAttributes<HTMLTableSectionElement>;
  td: TdHTMLAttributes<HTMLTableDataCellElement>;
  textarea: InputHTMLAttributes<HTMLTextAreaElement>;
  tfoot: HTMLAttributes<HTMLTableSectionElement>;
  thead: HTMLAttributes<HTMLTableSectionElement>;
  tr: HTMLAttributes<HTMLTableRowElement>;
  ul: HTMLAttributes<HTMLUListElement>;
};

// Makes sure the key is correct HTML tag
type HtmlProps = {
  [K in keyof HtmlPropsMap & keyof JSX.IntrinsicElements]: HtmlPropsMap[K];
};

// Overwrite native types and/or add custom props
// prettier-ignore
type EnhancedHtmlProps<
  HtmlTag extends keyof HtmlProps,
  T extends Partial<HtmlProps[HtmlTag]> & Record<string, unknown>
> = T & Omit<HtmlProps[HtmlTag], keyof T>;

type HtmlElement = {
  a: HTMLAnchorElement;
  button: HTMLButtonElement;
  dialog: HTMLDialogElement;
  div: HTMLDivElement;
  form: HTMLFormElement;
  img: HTMLImageElement;
  input: HTMLInputElement;
  label: HTMLLabelElement;
  li: HTMLLIElement;
  option: HTMLOptionElement;
  p: HTMLParagraphElement;
  select: HTMLSelectElement;
  span: HTMLSpanElement;
  table: HTMLTableElement;
  tbody: HTMLTableSectionElement;
  td: HTMLTableDataCellElement;
  textarea: HTMLTextAreaElement;
  tfoot: HTMLTableSectionElement;
  thead: HTMLTableSectionElement;
  tr: HTMLTableRowElement;
  ul: HTMLUListElement;
};

type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>['ref'];
type PolymorphicProps<T extends ElementType> = { as?: T } & Omit<ComponentPropsWithoutRef<T>, 'as'>;
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
