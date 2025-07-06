import { useMemo } from 'react';
import { useFieldContext } from 'architecture/hooks/use-field-context/use-field.context.ts';
import type { LabelElementProps, LabelProps } from './label.props.ts';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';

const Label = ({ htmlFor, className, children }: LabelProps) => {
  const fieldContext = useFieldContext();
  const labelId = useMemo(() => fieldContext?.sharedId || htmlFor, [fieldContext?.sharedId, htmlFor]);

  return useRenderedMarkup<undefined, LabelElementProps>({
    wrapperElement: 'label',
    elementProps: { htmlFor: labelId, },
    className,
    children
  });
};

export { Label };
