import type { FormInputControl, MakeRequired } from '@beesoft/common';
import type { BaseEvent } from '../../../component-interfaces.ts';
import type {
  ComparatorFunction,
  DataComparator,
} from 'architecture/hooks/use-data-comparator/use-data-comparator.props.ts';
import type { ReactNode } from 'react';
import type { Signal } from '@preact/signals-react';
import type { CheckboxChangeEvent } from '../checkboxes.interfaces.ts';

export interface CheckboxGroupChangeEvent extends BaseEvent<HTMLInputElement> {
  name: string;
  value?: Array<unknown>;
}

export interface CheckboxGroupProps<T>
  extends MakeRequired<FormInputControl<T, CheckboxGroupChangeEvent>, 'name'> {
  comparator?: DataComparator<T>
  children?: Array<ReactNode>;
}

export type CheckboxGroupContextTypes<T> =
  | Signal
  | ComparatorFunction<T> | (
  (event?: CheckboxChangeEvent) => void);
