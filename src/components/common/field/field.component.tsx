import { useId, useMemo } from 'react';
import {
  FieldContext,
  type FieldContextProps
} from 'architecture/hooks/use-field-context/use-field-context.props.ts';
import type { FieldProps } from './field.props.ts';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';

const Field = ({ className, children }: FieldProps) => {
  // this will be used to associate a control with something like a label...use a context to share this
  const sharedId = useId();

  const contextProps = useMemo<FieldContextProps>(() => {
    return {
      sharedId,
    };
  }, [sharedId]);

  // the reason we are allowed to wrap the children property here is because its not allowed to be used as a render
  // function.
  const finalChildren = <FieldContext.Provider value={contextProps}>{children}</FieldContext.Provider>;

  return useRenderedMarkup({
    wrapperElement: 'div',
    className,
    children: finalChildren,
  });
};

export { Field };
