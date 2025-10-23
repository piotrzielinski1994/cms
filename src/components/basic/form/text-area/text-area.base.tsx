import { forwardRef, InputHTMLAttributes } from 'react';
import Form from '../root/form';

type InputProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value'> & {
  name: string;
  value?: string;
};

const Input = forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => {
  return <textarea ref={ref} contentEditable={false} {...props} value={props.value ?? ''} />;
});

const TextAreaBase = {
  Root: Form.Group,
  Label: Form.Label,
  Input,
  Error: Form.Error,
};

export default TextAreaBase;
