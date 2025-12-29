import type { TypeOrArray } from '@beesoft/common';
import type { ReactNode } from 'react';

export interface ItemScrollerPageProps {
  intersectionObserver?: IntersectionObserver | null;
  resizeObserver?: ResizeObserver | null;
  page: number;
  height?: number;
  children: TypeOrArray<ReactNode>;
}
