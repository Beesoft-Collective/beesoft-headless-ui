import type { CheckboxChangeEvent } from '../checkboxes.interfaces.ts';
import type { ChildrenType } from 'architecture/headless-interfaces.ts';
import type { FormInputControl, MakeRequired } from '@beesoft/common';

export interface CheckboxCheckState {
  checked: boolean;
  partial: boolean;
}

export interface CheckboxRenderProps {
  checked: boolean;
  partial: boolean;
  readOnly?: boolean;
}

export interface CheckboxProps extends MakeRequired<FormInputControl<unknown, CheckboxChangeEvent>, 'name'> {
  checked?: boolean;
  partial?: boolean;
  children?: ChildrenType<CheckboxRenderProps>;
}

export interface CheckboxRef {
  setPartiallyChecked: (partiallyChecked: boolean) => void;
  setChecked: (checked: boolean) => void;
}
