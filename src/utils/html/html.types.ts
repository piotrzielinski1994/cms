import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  LiHTMLAttributes,
} from 'react';

type HtmlProps = {
  a: AnchorHTMLAttributes<HTMLAnchorElement>;
  button: ButtonHTMLAttributes<HTMLButtonElement>;
  div: HTMLAttributes<HTMLDivElement>;
  img: ImgHTMLAttributes<HTMLImageElement>;
  input: InputHTMLAttributes<HTMLInputElement>;
  label: HTMLAttributes<HTMLLabelElement>;
  li: LiHTMLAttributes<HTMLLIElement>;
  p: HTMLAttributes<HTMLParagraphElement>;
  span: HTMLAttributes<HTMLSpanElement>;
  ul: HTMLAttributes<HTMLUListElement>;
};

export { type HtmlProps };
