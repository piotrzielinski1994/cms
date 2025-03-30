const optional = <T, R>(val: T | undefined | null, fn: (val: T) => R): R | undefined | null => {
  if (val === undefined) return undefined;
  if (val === null) return null;
  return fn(val);
};

export { optional };
