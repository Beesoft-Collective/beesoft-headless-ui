import type { HeadlessProviderProps } from './headless-provider.props.ts';
import { HeadlessContext } from '../../hooks/use-headless-context.ts';
import type { HeadlessPropsWithChildren } from 'architecture/headless-interfaces.ts';
import { useRenderChildren } from 'architecture/hooks/use-render-children/use-render-children.hook.ts';
import React from 'react';

/**
 * This component contains the code to pass context information to child headless components. For our framework the data
 * being passed are Signal objects that will be passed the actual data that is needed by the child component.
 * @param {Record<string, T>} props - A JavaScript object containing items that need to be available to other child components.
 * @param {Record<string, unknown>} renderProps - The properties used to render the children.
 * @param {ChildrenType<RP>} children - The content to wrap the context around.
 * @returns {JSX.Element}
 * @constructor
 */
const HeadlessProvider = <T, RP,>({
  props,
  renderProps,
  children
}: HeadlessPropsWithChildren<HeadlessProviderProps<T, RP>, RP>) => {
  const finalChildren = useRenderChildren({ renderProps, children });
  return <HeadlessContext.Provider value={props}>{finalChildren}</HeadlessContext.Provider>;
};

export { HeadlessProvider };
