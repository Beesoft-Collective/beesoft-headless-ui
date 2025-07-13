import { createContext, useContext } from 'react';

export const HeadlessContext = createContext<Record<string, unknown>>(undefined!);

/**
 * Allows the headless context to be retrieved in a child component.
 * @returns {Record<string, unknown>} The headless context.
 */
const useHeadlessContext = () => {
  return useContext(HeadlessContext);
};

export { useHeadlessContext };
