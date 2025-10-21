import { HtmlProps } from '@/utils/html/html.types';
import { forwardRef } from 'react';
import Form from '../root/form';

type InputProps = {
  name: string;
  value?: string;
  accept?: string;
  multiple?: boolean;
} & Omit<HtmlProps['input'], 'type' | 'value' | 'accept' | 'multiple'>;

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

const CloseAllButton = (props: HtmlProps['button']) => {
  return <button type="button" {...props} />;
};

Input.displayName = 'FileInputBase.Input';

const FileInputBase = {
  Root: Form.Group,
  Label: Form.Label,
  Wrapper,
  Input,
  Items,
  Item,
  CloseAllButton,
  Error: Form.Error,
};

export default FileInputBase;
