import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
} from 'react';
import Form from '../root/form';

type InputProps = {
  name: string;
  value?: number | string; // String to support formatted values
  min?: number;
  max?: number;
  step?: number;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value'>;

// To hold input along with buttons
const InputWrapper = (props: HTMLAttributes<HTMLDivElement>) => <div {...props} />;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // To support formatted values
  const defaultProps = { type: 'text', role: 'spinbutton', autoComplete: 'off' };
  return <input ref={ref} {...defaultProps} {...props} value={props.value ?? ''} />;
});

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  // Use up/down arrows instead of focusing buttons
  return <button type="button" tabIndex={-1} {...props} />;
};

Input.displayName = 'NumberInputBase.Input';

const NumberInputBase = {
  Root: Form.Group,
  Label: Form.Label,
  InputWrapper,
  Input,
  Button,
  Error: Form.Error,
};

export default NumberInputBase;
