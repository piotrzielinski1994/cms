import { ElementType, FormHTMLAttributes, HTMLAttributes, HTMLProps } from 'react';

const Root = (props: FormHTMLAttributes<HTMLFormElement>) => {
  return <form {...props} />;
};

const Group = (props: HTMLAttributes<HTMLDivElement>) => <div {...props} />;

const Label = <T extends HTMLProps<HTMLLabelElement>>(props: T & { as?: ElementType }) => {
  const { as: Cmp = 'label', ...rest } = props;
  return <Cmp {...rest} />;
};

const Error = (props: HTMLAttributes<HTMLSpanElement>) => {
  return <span role="alert" aria-hidden={!props.children} {...props} />;
};

const FormBase = {
  Root,
  Group,
  Label,
  Error,
};

export default FormBase;
