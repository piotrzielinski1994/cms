import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { Circle } from 'lucide-react';
import { forwardRef } from 'react';
import { styles as checkboxStyles } from '../checkbox/checkbox';
import Form from '../root/form';

type RadioProps = NativeProps & {
  label: string;
  error?: string;
};

// prettier-ignore
type NativeProps = Omit<EnhancedHtmlProps<'input', {
  name: string;
  value?: string;
}>, 'type'>;

const styles = {
  wrapper: checkboxStyles.wrapper,
  nativeWrapper: ({ isValid }: { isValid: boolean }) =>
    cn(checkboxStyles.native({ isValid }), 'rounded-full'),
  native: 'sr-only',
  icon: cn(checkboxStyles.icon, 'w-[0.4lh] h-[0.4lh]', 'fill-current'),
} as const;

const Component = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { label, error, className, ...rest } = props;
  return (
    <Root className={className}>
      <Label className={styles.wrapper}>
        <Native ref={ref} aria-invalid={!!error} {...rest} />
        <span>{label}</span>
      </Label>
      <Error>{error}</Error>
    </Root>
  );
});

const Native = forwardRef<HTMLInputElement, NativeProps>((props, ref) => {
  const { className, ...rest } = props;
  const base = styles.nativeWrapper({ isValid: !rest['aria-invalid'] });
  return (
    <div className={cn(base, className)}>
      <input ref={ref} type="radio" className={styles.native} {...rest} />
      <Circle className={styles.icon} />
    </div>
  );
});

const Root = Form.Group;
const Label = Form.Label;
const Error = Form.Error;

const Radio = Object.assign(Component, { Root, Label, Native, Error, styles });

export { Radio };
