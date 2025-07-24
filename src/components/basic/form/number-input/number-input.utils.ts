import { Locale } from 'next-intl';
import { ComponentProps } from 'react';
import z from 'zod';
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
  const endsWithDecimal = formattedValue.endsWith(',') || formattedValue.endsWith('.');
  const normalized = formattedValue
    .replace(new RegExp(`[^\\d${decimal}-]`, 'g'), '')
    .replace(decimal, '.');
  return normalized.endsWith('.') ? normalized : normalized.concat(endsWithDecimal ? '.' : '');
};

const getValidator = (
  props: Pick<ComponentProps<typeof NumberInput>, 'maxIntLength' | 'maxDecimalLength' | 'min'>,
) => {
  const { maxIntLength, maxDecimalLength, min } = props;
  const isNegative = min === undefined || min < 0;
  return isNumber({
    int: maxIntLength,
    frac: maxDecimalLength,
    negative: isNegative,
  });
};

const isNumber = ({
  int,
  frac = 0,
  negative = false,
}: { int?: number; frac?: number; negative?: boolean } = {}) => {
  const signPart = negative ? '-?' : '';
  const intPart = int ? `\\d{1,${int}}` : '\\d+';
  const fracPart = frac > 0 ? `(\\.\\d{0,${frac}})?` : '';
  return z.string().regex(new RegExp(`^${signPart}${intPart}${fracPart}$`));
};

export { createNumberFormatter, createNumberUnformatter, getValidator, isNumber };
