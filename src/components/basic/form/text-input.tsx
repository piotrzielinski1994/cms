import FormGroup from './form-group';

type TextInputProps = {};

const TextInput = (props: TextInputProps) => {
  return (
    <FormGroup>
      <input type="text" {...props} />
    </FormGroup>
  );
};

export default TextInput;
