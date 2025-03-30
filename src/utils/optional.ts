const optional = <T, R>(val: T | undefined, fn: (val: T) => R): R | undefined => {
  if (val === undefined) return undefined;
  return fn(val);
};

export { optional };
