import type { FormInputControl, TypeOrArray } from '@beesoft/common';
import type { Signal } from '@preact/signals-react';
import type { ChildrenType } from 'architecture/headless-interfaces.ts';

export interface CalendarRenderProps {
  readOnly: boolean;
}

export interface CalendarProps extends FormInputControl<string | TypeOrArray<Date>, TypeOrArray<Date>> {
  viewDate?: Date;
  localeCode?: string;
  children?: ChildrenType<CalendarRenderProps>
}

export type CalendarContextTypes =
  | Signal
  | (((event?: TypeOrArray<Date>) => void) | undefined);
