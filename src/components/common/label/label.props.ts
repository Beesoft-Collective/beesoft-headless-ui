import type { ChildrenType } from '../../../architecture/headless-interfaces.ts';

export interface LabelElementProps {
  htmlFor?: string;
}

export interface LabelProps {
  htmlFor?: string;
  className?: string;
  children: ChildrenType;
}
