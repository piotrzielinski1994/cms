import { HtmlProps } from '@/utils/html/html.types';
import { ElementType } from 'react';

const Root = (props: HtmlProps['form']) => {
  return <form {...props} />;
};

const Group = (props: HtmlProps['div']) => <div {...props} />;

const Label = <T extends HtmlProps['label']>(props: T & { as?: ElementType }) => {
  const { as: Cmp = 'label', ...rest } = props;
  return <Cmp {...rest} />;
};

const Error = (props: HtmlProps['span']) => {
  return <span role="alert" aria-hidden={!props.children} {...props} />;
};

const FormBase = {
  Root,
  Group,
  Label,
  Error,
};

export default FormBase;
