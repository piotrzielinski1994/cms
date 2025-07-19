'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { fromPairs, toPairs } from 'ramda';
import { useMemo } from 'react';
import z from 'zod';

type UseQueryParamsArgs<T> = {
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

const useQueryParams = <T extends Record<string, UseQueryParamsArgs<unknown>>>(
  config: T,
): [
  { [K in keyof T]: T[K]['defaultValue'] },
  (values: Partial<{ [K in keyof T]: T[K]['defaultValue'] }>) => void,
] => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const values = useMemo(() => {
    const pairs = toPairs(config).map(([key, conf]) => {
      const raw = searchParams.get(key as string) ?? undefined;
      const parse = conf.parse ?? takeDefaultParser(conf.defaultValue);
      return [key, parse(raw)] as [keyof T, T[keyof T]['defaultValue']];
    });
    return fromPairs(pairs);
  }, [searchParams, config]);

  const setValues = (newValues: Partial<{ [K in keyof T]: T[K]['defaultValue'] }>) => {
    const updated = toPairs(newValues).reduce(
      (acc, [key, val]: [keyof T, T[keyof T]['defaultValue']]) => {
        const serialize = config[key].serialize ?? String;
        if (val != null) acc.set(key as string, serialize(val));
        else acc.delete(key as string);
        return acc;
      },
      new URLSearchParams(searchParams.toString()),
    );

    router.push(`?${updated.toString()}${window.location.hash}`);
  };

  return [values, setValues];
};

export { useQueryParams };
