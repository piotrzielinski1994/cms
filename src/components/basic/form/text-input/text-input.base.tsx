import { forwardRef, InputHTMLAttributes } from 'react';
import Form from '../root/form';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  name: string;
  value?: string;
};

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
