import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FormHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  JSX,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';

type HtmlPropsMap = {
  a: AnchorHTMLAttributes<HTMLAnchorElement>;
  button: ButtonHTMLAttributes<HTMLButtonElement>;
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

export type { EnhancedHtmlProps, HtmlProps };
