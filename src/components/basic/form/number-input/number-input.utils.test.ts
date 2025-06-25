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
    ['pl', '1\u00A0234\u00A0567,89', '1234567.89'],
    ['en', '1,234,567.89', '1234567.89'],
  ] satisfies [Locale, string, string][])(
    'should unformat number for %s',
    async (locale, input, output) => {
      const unformat = createNumberUnformatter(locale);
      expect(unformat(input)).toBe(output);
    },
  );
});
