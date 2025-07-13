import type { ChangeEvent, ReactNode } from 'react';
import type { FormInputControl, MakeRequired, TypeOrArray } from '@beesoft/common';
import type { DataComparator } from 'architecture/hooks/use-data-comparator/use-data-comparator.hook.ts';

export interface RadioChangeEvent {
  name: string;
  value: unknown;
  originalEvent?: ChangeEvent<HTMLInputElement>;
}

export interface RadioGroupProps<T> extends MakeRequired<FormInputControl<T, RadioChangeEvent>, 'name'> {
  comparator?: DataComparator<T>
  children?: TypeOrArray<ReactNode>;
}
