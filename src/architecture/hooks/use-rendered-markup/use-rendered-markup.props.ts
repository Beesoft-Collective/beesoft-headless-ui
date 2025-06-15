import type { ElementType, JSX, ReactNode } from 'react';
import type { ChildrenType } from '../../headless-interfaces.ts';

export interface RenderedMarkupProps<RP = undefined, P = undefined> {
  wrapperElement: ElementType;
  /**
   * When a render function is used this object will be passed as a parameter, when a child node is used the values set
   * in this object will be added to the wrapper element as `data-*` properties.
   */
  renderProps?: RP;
  /**
   * If properties that are not `data-*` properties are needed on the wrapper element this can be used to add those
   * properties.
   */
  elementProps?: P;
  /**
   * Allows an element to be set in the children parameter without affecting the functionality of a child render
   * function.
   */
  innerWrapperElement?: JSX.Element | ReactNode;
  className?: string;
  children: ChildrenType<RP>;
}
