import { forceAssert, type TypeOrArray } from '@beesoft/common';
import React, { createElement, type ReactNode } from 'react';
import { createDataProperties } from '../../functions/create-data-properties.ts';
import type { RenderedMarkupProps } from './use-rendered-markup.props.ts';
import { useRenderChildren } from 'architecture/hooks/use-render-children/use-render-children.hook.ts';

const useRenderedMarkup = <RP = undefined, P = undefined>({
  wrapperElement,
  renderProps,
  elementProps,
  innerWrapperElement,
  className,
  children,
}: RenderedMarkupProps<RP, P>): React.JSX.Element | TypeOrArray<ReactNode> => {
  const renderedChildren = useRenderChildren({ renderProps, children });
  const finalChildren = innerWrapperElement ? (
    <>
      {innerWrapperElement}
      {renderedChildren}
    </>
  ) : renderedChildren;

  if (typeof children !== 'function') {
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

  return finalChildren;
};

export { useRenderedMarkup };
