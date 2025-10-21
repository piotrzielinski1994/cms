import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { forwardRef } from 'react';
import Form from '../root/form';

// prettier-ignore
type InputProps = EnhancedHtmlProps<'input', {
  name: string;
  value?: string;
}>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} type="text" {...props} value={props.value ?? ''} />;
});

Input.displayName = 'TextInputBase.Input';

const TextInputBase = {
  Root: Form.Group,
  Label: Form.Label,
  Input,
  Error: Form.Error,
};

export default TextInputBase;
