import { useMemo } from 'react';
import { useFieldContextHook } from 'architecture/hooks/use-field-context/use-field-context.hook.ts';
import type { LabelElementProps, LabelProps } from './label.props.ts';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';

const Label = ({ htmlFor, className, children }: LabelProps) => {
  const fieldContext = useFieldContextHook();
  const labelId = useMemo(() => fieldContext?.sharedId || htmlFor, [fieldContext?.sharedId, htmlFor]);

  return useRenderedMarkup<undefined, LabelElementProps>({
    wrapperElement: 'label',
    elementProps: { htmlFor: labelId, },
    className,
    children
  });
};

export { Label };
