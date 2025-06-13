import { useContext } from 'react';
import { FieldContext } from './use-field-context.props.ts';

const useFieldContextHook = () => {
  return useContext(FieldContext);
};

export { useFieldContextHook };
