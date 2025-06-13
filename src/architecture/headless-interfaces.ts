import React, { type ReactNode } from 'react';
import type { TypeOrArray } from '@beesoft/common';

/**
 * The child render function used to render custom markup.
 */
export type ChildRenderFunction<RP = undefined> = (props?: RP) => React.JSX.Element;
export type ChildrenType<RP = undefined> = ChildRenderFunction<RP> | TypeOrArray<ReactNode>;

export type WithHeadlessChildRenderProp<T> = T & {
  children: (props: T) => React.JSX.Element;
};
