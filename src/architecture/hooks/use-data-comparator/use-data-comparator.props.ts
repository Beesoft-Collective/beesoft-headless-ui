// disabling since it's not always needed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComparatorFunction<T = any> = (item1: T, item2: T) => boolean;

/**
 * Allows for either a non-nullable string or a comparison function to be defined to determine if a value matches.
 */
export type DataComparator<T> =
  | string
  | ComparatorFunction<T>;
