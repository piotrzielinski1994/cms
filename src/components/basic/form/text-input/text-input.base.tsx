import { forwardRef, HTMLAttributes, InputHTMLAttributes } from 'react';
import Form from '../root/form';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return <input ref={ref} type="text" {...props} value={props.value ?? ''} />;
});

const TextInputBase = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

Input.displayName = 'TextInputBase.Input';
TextInputBase.Input = Input;
TextInputBase.Error = Form.Error;

export { TextInputBase };
