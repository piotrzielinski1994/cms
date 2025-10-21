import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  LiHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';

type HtmlProps = {
  a: AnchorHTMLAttributes<HTMLAnchorElement>;
  button: ButtonHTMLAttributes<HTMLButtonElement>;
  div: HTMLAttributes<HTMLDivElement>;
  img: ImgHTMLAttributes<HTMLImageElement>;
  input: InputHTMLAttributes<HTMLInputElement>;
  label: HTMLAttributes<HTMLLabelElement>;
  li: LiHTMLAttributes<HTMLLIElement>;
  option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
  p: HTMLAttributes<HTMLParagraphElement>;
  select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
  span: HTMLAttributes<HTMLSpanElement>;
  ul: HTMLAttributes<HTMLUListElement>;
};

// Overwrite native types and/or add custom props
// prettier-ignore
type EnhancedHtmlProps<
  HtmlTag extends keyof HtmlProps,
  T extends Partial<HtmlProps[HtmlTag]> & Record<string, unknown>
> = T & Omit<HtmlProps[HtmlTag], keyof T>;

export type { EnhancedHtmlProps, HtmlProps };
