'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import z from 'zod';

type UseQueryParamArgs<T = string> = {
  key: string;
  defaultValue: T;
  parse?: (v: string | undefined) => T;
  serialize?: (v: T) => string;
};

const takeDefaultParser =
  <T>(defaultValue: T) =>
  (value: string | undefined): T => {
    if (value === undefined) return defaultValue;
    try {
      switch (typeof defaultValue) {
        case 'string':
        case 'undefined':
          return value as T;
        case 'number':
          return z.coerce.number().parse(value) as T;
        case 'boolean':
          return z.coerce.boolean().parse(value) as T;
        default:
          throw new Error('Unhandled default value');
      }
    } catch {
      return defaultValue;
    }
  };

const useQueryParam = <T>({
  key,
  defaultValue,
  parse = takeDefaultParser(defaultValue),
  serialize = String,
}: UseQueryParamArgs<T>): [T, (value: T) => void] => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = useMemo(() => {
    const raw = searchParams.get(key) ?? undefined;
    return parse(raw);
  }, [searchParams, key, parse]);

  const setValue = (val: T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, serialize(val));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return [value, setValue];
};

export { useQueryParam };
