import type { PropsWithChildren } from 'react';
import type { HeadlessProviderProps } from './headless-provider.props.ts';
import { HeadlessContext } from '../../hooks/use-headless-context.ts';

/**
 * This component contains the code to pass context information to child headless components. For our framework the data
 * being passed are Signal objects that will be passed the actual data that is needed by the child component.
 * @param {Record<string, T>} props - A JavaScript object containing items that need to be available to other child components.
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | Iterable<React.ReactNode> | React.ReactPortal | boolean | undefined | null} children - The JSX to wrap the context around.
 * @returns {JSX.Element}
 * @constructor
 */
const HeadlessProvider = <T,>({ props, children }: PropsWithChildren<HeadlessProviderProps<T>>) => {
  return <HeadlessContext.Provider value={props}>{children}</HeadlessContext.Provider>;
};

export { HeadlessProvider };
