import { useContext } from 'react';
import { FieldContext } from './use-field-context.props.ts';

const useFieldContext = () => {
  return useContext(FieldContext);
};

export { useFieldContext };
