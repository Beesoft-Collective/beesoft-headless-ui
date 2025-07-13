import type {
  ComparatorFunction,
  DataComparator,
} from 'architecture/hooks/use-data-comparator/use-data-comparator.props.ts';
import { useEvent } from '@beesoft/common';

const defaultComparator = <T,>(item1: T, item2: T) => {
  if (
    item1 && item2 && typeof item1 === 'object' && typeof item2 === 'object' && 'value' in item1 && 'value' in item2
  ) {
    return item1.value === item2.value;
  }

  return item1 === item2;
};

const useDataComparator = <T,>(comparator: DataComparator<T> = defaultComparator): ComparatorFunction<T> => {
  return useEvent((item1: T, item2: T) => {
    if (typeof comparator === 'string') {
      const field = comparator as keyof T;
      return item1?.[field] === item2?.[field];
    }

    return comparator(item1, item2);
  });
};

export { useDataComparator };
