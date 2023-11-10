export const typedKeys = <T>(o: Record<string, unknown>): (keyof T)[] =>
  Object.keys(o) as (keyof T)[];
export const typedEntries = <T extends Record<string, unknown>>(
  o: T,
): [keyof T, T[keyof T]][] => Object.entries(o) as [keyof T, T[keyof T]][];
export const typedValues = <T extends Record<string, unknown>>(
  o: T,
): T[keyof T][] => Object.values(o) as T[keyof T][];
