import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, value, ...props }, ref) => (
  <input ref={ref} type="text" value={value ?? ''} {...props} className={className} />
));

type ErrorProps = React.PropsWithChildren<{
  className?: string;
}>;

const Error = ({ children, className }: ErrorProps) => (
  <span className={className} role="alert">
    {children}
  </span>
);

type TextInputBaseProps = React.PropsWithChildren<{
  className?: string;
}>;

const TextInputBase = ({ children, className }: TextInputBaseProps) => (
  <div className={className}>{children}</div>
);

Input.displayName = 'TextInputBase.Input';

TextInputBase.Input = Input;
TextInputBase.Error = Error;

export { TextInputBase };
