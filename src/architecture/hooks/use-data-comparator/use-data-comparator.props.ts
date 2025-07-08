import { useCallback } from 'react';

type ComparatorFunction<T> = (item1: T, item2: T) => boolean;

/**
 * Allows for either a non-nullable string or a comparison function to be defined to determine if a value matches.
 */
export type DataComparator<T> =
  | (NonNullable<T> extends never ? string : keyof NonNullable<T> & string)
  | ComparatorFunction<T>;

const useDataComparator = <T,>(comparator: DataComparator<T>): ComparatorFunction<T> => {
  return useCallback((item1: T, item2: T) => {
    if (typeof comparator === 'string') {
      const field = comparator as keyof T;
      return item1?.[field] === item2?.[field];
    }

    return comparator(item1, item2);
  }, [comparator]);
};

const defaultComparator = <T,>(item1: T, item2: T) => {
  if (
    item1 && item2 && typeof item1 === 'object' && typeof item2 === 'object' && 'value' in item1 && 'value' in item2
  ) {
    return item1.value === item2.value;
  }

  return item1 === item2;
};

export { useDataComparator, defaultComparator };
