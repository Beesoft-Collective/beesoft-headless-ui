import type { MakeRequired } from '@beesoft/common';
import type { HTMLInputTypeAttribute } from 'react';
import type { FormInputControl } from '../../components/form/form-control.interface.ts';

export interface HeadlessFieldProps extends MakeRequired<FormInputControl, 'id' | 'name'> {
  type: HTMLInputTypeAttribute;
  checked?: boolean;
}
