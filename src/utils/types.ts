// `Partial`, but only for specific keys
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type { Optional };
