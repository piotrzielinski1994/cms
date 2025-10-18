import { forwardRef, InputHTMLAttributes } from 'react';
import Form from '../root/form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} type="text" {...props} value={props.value ?? ''} />;
});

Input.displayName = 'TextInputBase.Input';

const TextInputBase = {
  Root: Form.Group,
  Label: Form.Label,
  Input: Input,
  Error: Form.Error,
};

export default TextInputBase;
