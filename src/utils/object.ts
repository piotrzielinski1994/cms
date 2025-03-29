export const toEntries = <T extends Record<string, unknown>>(qwe: T) => {
  return Object.entries(qwe) as [keyof T, T[keyof T]][];
};
