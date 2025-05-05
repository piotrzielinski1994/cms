// @ts-nocheck // TODO: Fix types
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const getZodErrorsMap: (t: ReturnType<typeof useTranslations<'zod'>>) => z.ZodErrorMap =
  (t) =>
  (issue): { message: string } => {
    const path = issue.path?.join('.') || '';
    switch (issue.code) {
      case z.ZodIssueCode.invalid_type:
        return {
          message:
            issue.received === 'undefined'
              ? t('invalid_type_received_undefined', { path })
              : t('invalid_type', { expected: issue.expected, received: issue.received }),
        };
      case z.ZodIssueCode.too_small:
        return {
          message: t(`too_small.${issue.type}.${issue.inclusive ? 'inclusive' : 'not_inclusive'}`, {
            path,
            minimum: typeof issue.minimum === 'bigint' ? Number(issue.minimum) : issue.minimum,
          }),
        };
      case z.ZodIssueCode.too_big:
        return {
          message: t(`too_big.${issue.type}.${issue.inclusive ? 'inclusive' : 'not_inclusive'}`, {
            path,
            maximum: typeof issue.maximum === 'bigint' ? Number(issue.maximum) : issue.maximum,
          }),
        };
      case z.ZodIssueCode.invalid_string:
        return {
          message: t(`invalid_string.${issue.validation}`, { path }),
        };
      default:
        return { message: t('custom', { path }) };
    }
  };

export { getZodErrorsMap };
