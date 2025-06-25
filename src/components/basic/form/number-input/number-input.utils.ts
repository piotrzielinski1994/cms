import { Locale } from 'next-intl';

const createNumberFormatter = (locale: Locale) => (value: string) => {
  const number = Number(value);
  if (isNaN(number)) return value;
  return new Intl.NumberFormat(locale).format(number);
};

const createNumberUnformatter = (locale: Locale) => (value: string) => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234567.89);
  const decimal = parts.find((p) => p.type === 'decimal')?.value ?? '.';
  return value.replace(new RegExp(`[^\\d${decimal}]`, 'g'), '').replace(decimal, '.');
};

export { createNumberFormatter, createNumberUnformatter };
