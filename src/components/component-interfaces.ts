import type { ChangeEvent } from 'react';

export interface ComponentAnimationProps {
  useAnimation?: boolean;
}

export interface BaseEvent<T extends HTMLElement> {
  originalEvent?: ChangeEvent<T>;
}
