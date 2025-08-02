import type { FormInputControl } from '@beesoft/common';
import type { FormEvent } from 'react';
import type { ChildrenType } from 'architecture/headless-interfaces.ts';

type InputModeType = "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";

export interface InputRenderProps {
  readOnly: boolean;
  focussed: boolean;
  blurred: boolean;
  placeholderShown: boolean;
}

export interface InputElementProps {
  contentEditable: boolean;
  suppressContentEditableWarning: boolean;
  inputMode?: InputModeType;
  onInput?: (event: FormEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onPaste?: (event: ClipboardEvent) => void;
}

export interface InputProps extends FormInputControl<string> {
  inputMode?: InputModeType;
  onKeyDown?: (event: KeyboardEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onPaste?: (event: ClipboardEvent) => void;
  children?: ChildrenType<InputRenderProps>;
}

export interface InputRef {
  setInnerText: (value: string) => void;
  setInnerHTML: (value: string) => void;
  focus: () => void;
}

export interface InputComponentState {
  focussed: boolean;
  blurred: boolean;
  placeholderShown: boolean;
}
