import type { ChildrenType } from 'architecture/headless-interfaces.ts';

export interface RadioItemRenderProps {
  checked: boolean;
  readOnly?: boolean;
}

export interface RadioItemElementProps {
  htmlFor: string;
}

export interface RadioItemProps {
  value?: unknown;
  className?: string;
  children?: ChildrenType<RadioItemRenderProps>;
}
