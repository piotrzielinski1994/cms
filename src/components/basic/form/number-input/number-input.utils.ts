import { isDecimal, isInteger } from '@/utils/zod';
import { Locale } from 'next-intl';
import { ComponentProps } from 'react';
import { NumberInput } from './number-input';

const createNumberFormatter = (locale: Locale) => (rawValue: string) => {
  const number = parseFloat(rawValue);
  if (isNaN(number)) return rawValue;

  const intl = new Intl.NumberFormat(locale);
  const formatted = intl.format(number);
  const decimal = intl.formatToParts(1.1).find((p) => p.type === 'decimal')?.value ?? '.';

  const endsWithDecimal = rawValue.endsWith(decimal) || rawValue.endsWith('.');
  return endsWithDecimal ? formatted + decimal : formatted;
};

const createNumberUnformatter = (locale: Locale) => (formattedValue: string) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234.8);
  const decimal = parts.find((p) => p.type === 'decimal')?.value ?? '.';
  return formattedValue.replace(new RegExp(`[^\\d${decimal}-]`, 'g'), '').replace(decimal, '.');
};

const getValidator = (props: ComponentProps<typeof NumberInput>) => {
  const isNegative = props.min === undefined || props.min < 0;

  if (props.mode === 'decimal') {
    const { maxIntLength, maxDecimalLength } = props;
    return isDecimal({
      int: maxIntLength,
      frac: maxDecimalLength,
      negative: isNegative,
    });
  }

  return isInteger(props.maxIntLength, isNegative);
};

export { createNumberFormatter, createNumberUnformatter, getValidator };
