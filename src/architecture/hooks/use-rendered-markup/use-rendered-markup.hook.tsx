import { forceAssert, type TypeOrArray } from '@beesoft/common';
import React, { createElement, type ReactNode } from 'react';
import { createDataProperties } from '../../functions/create-data-properties.ts';
import type { RenderedMarkupProps } from './use-rendered-markup.props.ts';

const useRenderedMarkup = <RP = undefined, P = undefined>({
  wrapperElement,
  renderProps,
  elementProps,
  innerWrapperElement,
  className,
  children,
}: RenderedMarkupProps<RP, P>): React.JSX.Element | TypeOrArray<ReactNode> => {
  if (typeof children === 'function') {
    return innerWrapperElement ? (
      <>
        {innerWrapperElement}
        {children(renderProps)}
      </>
    ) : children(renderProps);
  } else {
    const finalChildren = innerWrapperElement ? (
      <>
        {innerWrapperElement}
        {children}
      </>
    ) : children;

    return createElement(
      wrapperElement,
      Object.assign(
        {},
        renderProps ? createDataProperties(forceAssert<Record<string, unknown>>(renderProps)) : {},
        elementProps,
        {
          className
        },
      ),
      finalChildren
    );
  }
};

export { useRenderedMarkup };
