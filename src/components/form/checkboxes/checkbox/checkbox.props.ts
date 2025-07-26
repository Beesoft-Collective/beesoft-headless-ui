import type { CheckboxChangeEvent } from '../checkboxes.interfaces.ts';
import type { ChildrenType } from 'architecture/headless-interfaces.ts';
import type { FormInputControl } from '@beesoft/common';

export interface CheckboxCheckState {
  checked: boolean;
  partial: boolean;
}

export interface CheckboxRenderProps {
  checked: boolean;
  partial: boolean;
  readOnly?: boolean;
}

export interface CheckboxElementProps {
  htmlFor: string;
}

export interface CheckboxProps extends FormInputControl<unknown, CheckboxChangeEvent> {
  checked?: boolean;
  partial?: boolean;
  children?: ChildrenType<CheckboxRenderProps>;
}

export interface CheckboxRef {
  setPartiallyChecked: (partiallyChecked: boolean) => void;
  setChecked: (checked: boolean) => void;
}
