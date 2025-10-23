import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { forwardRef } from 'react';
import Form from '../root/form';

// prettier-ignore
type InputProps = EnhancedHtmlProps<'input', {
  name: string;
  accept?: string;
  multiple?: boolean;
}>;

const Wrapper = (props: HtmlProps['label']) => {
  return <label {...props} />;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input type="file" ref={ref} {...props} />;
});

const Items = (props: HtmlProps['ul']) => {
  return <ul {...props} />;
};

const Item = (props: HtmlProps['li']) => {
  return <li {...props} />;
};

const Placeholder = (props: HtmlProps['li']) => {
  return <span {...props} />;
};

const CloseAllButton = (props: HtmlProps['button']) => {
  return <button type="button" {...props} />;
};

const FileInputBase = {
  Root: Form.Group,
  Label: Form.Label,
  Wrapper,
  Input,
  Items,
  Item,
  Placeholder,
  CloseAllButton,
  Error: Form.Error,
};

export default FileInputBase;
