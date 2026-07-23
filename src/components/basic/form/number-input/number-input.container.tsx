import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import { useLocaleStore } from '@/store/locale';
import type { Optional } from '@/utils/types';
import { NumberInput } from './number-input';

type NumberInputContainerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<Optional<ComponentProps<typeof NumberInput>, 't'>, 'name'>;

const NumberInputContainer = <T extends FieldValues>(props: NumberInputContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const locale = useLocaleStore();
  const t = useTranslations('frontend');
  const { field, fieldState } = useController({ control, name });
  return (
    <NumberInput
      lang={locale}
      t={{ increment: t('increment'), decrement: t('decrement') }}
      {...rest}
      {...field}
      error={fieldState.error?.message}
      onChange={(e) => {
        const raw = e.target.value.replace(',', '.');
        const value = ['', '-'].includes(raw) ? null : Number(raw);
        field.onChange(value);
      }}
    />
  );
};

export { NumberInputContainer };
