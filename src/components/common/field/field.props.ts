import type { TypeOrArray } from '@beesoft/common';
import type { ReactNode } from 'react';

export interface FieldProps {
  className?: string;
  children: TypeOrArray<ReactNode>;
}
