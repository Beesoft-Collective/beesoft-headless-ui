import type { ReactNode } from 'react';
import type { FormInputControl, MakeRequired, TypeOrArray } from '@beesoft/common';
import type { DataComparator } from 'architecture/hooks/use-data-comparator/use-data-comparator.props.ts';
import type { BaseEvent } from '../../component-interfaces.ts';

export interface RadioChangeEvent extends BaseEvent<HTMLInputElement> {
  name: string;
  value: unknown;
}

export interface RadioGroupProps<T> extends MakeRequired<FormInputControl<T, RadioChangeEvent>, 'name'> {
  comparator?: DataComparator<T>
  children?: TypeOrArray<ReactNode>;
}
