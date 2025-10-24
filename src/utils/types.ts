// `Partial`, but only for specific keys
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// BoolMap<'IsValid' | 'isDisabled> => { isValid: boolean; isDisabled: boolean }
type BoolMap<T extends string> = { [K in T]: boolean };

export type { BoolMap, Optional };
