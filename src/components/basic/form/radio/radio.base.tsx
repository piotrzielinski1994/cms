import { forwardRef, InputHTMLAttributes } from 'react';
import Form from '../root/form';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'type'> & {
  name: string;
  value?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} type="radio" {...props} />;
});

Input.displayName = 'RadioBase.Input';

const RadioBase = {
  Root: Form.Group,
  Label: Form.Label,
  Input,
  Error: Form.Error,
};

export default RadioBase;
