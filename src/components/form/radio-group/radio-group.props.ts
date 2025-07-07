import type { ChangeEvent, ReactNode } from 'react';
import type { FormInputControl, MakeRequired, TypeOrArray } from '@beesoft/common';

export interface RadioChangeEvent {
  name: string;
  value: unknown;
  originalEvent?: ChangeEvent<HTMLInputElement>;
}

export interface RadioGroupProps extends MakeRequired<FormInputControl<unknown, RadioChangeEvent>, 'name'> {
  children?: TypeOrArray<ReactNode>;
}
