import { Locale } from 'next-intl';
import { describe, expect } from 'vitest';
import { createNumberFormatter, createNumberUnformatter } from './number-input.utils';

describe('format', () => {
  it.each([
    ['pl', '1234567.89', '1\u00A0234\u00A0567,89'],
    ['en', '1234567.89', '1,234,567.89'],
  ] satisfies [Locale, string, string][])(
    'should format number for %s',
    async (locale, input, output) => {
      const format = createNumberFormatter(locale);
      expect(format(input)).toBe(output);
    },
  );
});

describe('unformat', () => {
  it.each([
    { locale: 'pl', input: '1\u00A0234\u00A0567,89', output: '1234567.89' },
    { locale: 'pl', input: '123456789,', output: '123456789.' },
    { locale: 'pl', input: '123456789.', output: '123456789.' },
    { locale: 'en', input: '1,234,567.89', output: '1234567.89' },
    { locale: 'en', input: '123456789,', output: '123456789.' },
    { locale: 'en', input: '123456789.', output: '123456789.' },
  ] satisfies Array<{ locale: Locale; input: string; output: string }>)(
    'should unformat $input to $output for $locale',
    async ({ locale, input, output }) => {
      const unformat = createNumberUnformatter(locale);
      expect(unformat(input)).toBe(output);
    },
  );
});
