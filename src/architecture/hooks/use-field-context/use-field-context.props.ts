import { createContext } from 'react';

export interface FieldContextProps {
  sharedId: string;
}

export const FieldContext = createContext<FieldContextProps>(undefined!);
