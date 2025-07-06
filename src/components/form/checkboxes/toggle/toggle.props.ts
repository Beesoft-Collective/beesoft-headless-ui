import type { FormInputControl, MakeRequired } from '@beesoft/common';
import type { CheckboxChangeEvent } from '../checkboxes.interfaces.ts';
import type { ChildrenType } from 'architecture/headless-interfaces.ts';

export interface ToggleRenderProps {
  toggled: boolean;
  readOnly?: boolean;
}

export interface ToggleElementProps {
  htmlFor: string;
}

export interface ToggleProps extends MakeRequired<FormInputControl<unknown, CheckboxChangeEvent>, 'name'> {
  toggled?: boolean;
  children?: ChildrenType<ToggleRenderProps>;
}

export interface ToggleRef {
  setToggled: (toggled: boolean) => void;
}
