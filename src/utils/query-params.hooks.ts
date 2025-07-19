'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { fromPairs, toPairs } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
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
  const [optimisticState, setOptimisticState] = useState<{ [K in keyof T]: T[K]['defaultValue'] }>(
    () => {
      const pairs = toPairs(config).map(([key, conf]) => {
        const raw = searchParams.get(key as string) ?? undefined;
        const parse = conf.parse ?? takeDefaultParser(conf.defaultValue);
        return [key, parse(raw)] as [keyof T, T[keyof T]['defaultValue']];
      });
      return fromPairs(pairs);
    },
  );
  const stringifiedParams = useMemo(() => searchParams.toString(), [searchParams]);

  useEffect(() => {
    const updated = toPairs(optimisticState).reduce(
      (acc, [key, val]: [keyof T, T[keyof T]['defaultValue']]) => {
        const serialize = config[key].serialize ?? String;
        if (val != null) acc.set(key as string, serialize(val));
        else acc.delete(key as string);
        return acc;
      },
      new URLSearchParams(stringifiedParams),
    );

    const newSearchParams = updated.toString();
    if (newSearchParams === stringifiedParams) return;

    router.replace(`?${newSearchParams}${window.location.hash}`);
  }, [optimisticState, config, router, stringifiedParams]);

  const setValues = (newValues: Partial<{ [K in keyof T]: T[K]['defaultValue'] }>) => {
    setOptimisticState((prev) => ({ ...prev, ...newValues }));
  };

  return [optimisticState, setValues];
};

export { useQueryParams };
