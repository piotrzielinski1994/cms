import { Locale } from 'next-intl';
import { describe, expect } from 'vitest';
import { createNumberFormatter, createNumberUnformatter, isNumeric } from './number-input.utils';

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

describe('isNumber', () => {
  it.each([
    // int
    {
      config: undefined,
      input: '1',
      output: true,
    },
    {
      config: { int: 3 },
      input: '123',
      output: true,
    },
    {
      config: { int: 3 },
      input: '1234',
      output: false,
    },
    // frac
    {
      config: undefined,
      input: '1.',
      output: false,
    },
    {
      config: undefined,
      input: '1.1',
      output: false,
    },
    {
      config: { frac: 2 },
      input: '1.',
      output: true,
    },
    {
      config: { frac: 2 },
      input: '1.12',
      output: true,
    },
    {
      config: { frac: 2 },
      input: '1.123',
      output: false,
    },
    // negative
    {
      config: undefined,
      input: '-1',
      output: false,
    },
    {
      config: { negative: true },
      input: '-1',
      output: true,
    },
    // all
    {
      config: { int: 5, frac: 2, negative: true },
      input: '-12345.12',
      output: true,
    },
    {
      config: { int: 5, frac: 2, negative: true },
      input: '-123456.12',
      output: false,
    },
    {
      config: { int: 5, frac: 2, negative: true },
      input: '-12345.',
      output: true,
    },
    {
      config: { int: 5, frac: 2, negative: true },
      input: '-12345.123',
      output: false,
    },
    {
      config: { int: 5, frac: 2, negative: false },
      input: '-12345.12',
      output: false,
    },
  ] satisfies Array<{ config: Parameters<typeof isNumeric>[0]; input: string; output: boolean }>)(
    'should confirm the $input to be $output for $config',
    async ({ config, input, output }) => {
      const validator = isNumeric(config);
      const result = validator.safeParse(input);
      expect(result.success).toBe(output);
    },
  );
});
