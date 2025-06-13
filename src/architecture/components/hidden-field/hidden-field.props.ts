import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

export interface HiddenFieldProps {
  id?: string;
  name: string;
  value?: string | number;
  type: HTMLInputTypeAttribute;
  checked?: boolean;
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
