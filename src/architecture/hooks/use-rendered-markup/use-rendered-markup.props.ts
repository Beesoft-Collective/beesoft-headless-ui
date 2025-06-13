import type { ElementType } from 'react';
import type { ChildrenType } from '../../headless-interfaces.ts';

export interface RenderedMarkupProps<RP = undefined, P = undefined> {
  children: ChildrenType<RP>;
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
  wrapperElement: ElementType;
  className?: string;
}
