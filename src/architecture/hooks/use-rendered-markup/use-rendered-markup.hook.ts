import { forceAssert, type TypeOrArray } from '@beesoft/common';
import React, { createElement, type ReactNode } from 'react';
import { createDataProperties } from '../../functions/create-data-properties.ts';
import type { RenderedMarkupProps } from './use-rendered-markup.props.ts';

const useRenderedMarkup = <RP = undefined, P = undefined>({
  children,
  renderProps,
  elementProps,
  wrapperElement,
  className
}: RenderedMarkupProps<RP, P>): React.JSX.Element | TypeOrArray<ReactNode> => {
  if (typeof children === 'function') {
    return children(renderProps);
  } else {
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
      children
    );
  }
};

export { useRenderedMarkup };
