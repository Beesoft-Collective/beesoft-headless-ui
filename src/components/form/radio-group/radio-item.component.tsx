import type { RadioItemElementProps, RadioItemProps, RadioItemRenderProps } from './radio-item.props.ts';
import { memo, useEffect, useId, useMemo, useState } from 'react';
import { useHeadlessContext } from 'architecture/hooks/use-headless-context.ts';
import { type Signal, useSignalEffect } from '@preact/signals';
import { HiddenField } from 'architecture/components/hidden-field/hidden-field.component.tsx';
import { useFieldContext } from 'architecture/hooks/use-field-context/use-field.context.ts';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';

const RadioItemComponent = ({ value, className, children }: RadioItemProps) => {
  const [checkedState, setCheckedState] = useState(false);

  let nameSignal: Signal<string> | undefined;
  let valueSignal: Signal<unknown> | undefined;
  let readOnlySignal: Signal<boolean> | undefined;

  const headlessContext = useHeadlessContext();
  const fieldContext = useFieldContext();
  const internalId = useId();

  const finalId = useMemo(
    () => fieldContext?.sharedId || internalId,
    [fieldContext?.sharedId, internalId]
  );

  useEffect(() => {
    if (headlessContext) {
      nameSignal = headlessContext['nameSignal'] as Signal<string>;
      valueSignal = headlessContext['valueSignal'] as Signal<unknown>;
      readOnlySignal = headlessContext['readOnlySignal'] as Signal<boolean>;
    }
  }, [headlessContext]);

  useSignalEffect(() => {
    setCheckedState(value === valueSignal?.value);
  });

  const hiddenField = nameSignal ? (
    <HiddenField
      id={finalId}
      name={nameSignal.value}
      type="radio"
      value={value as string | number}
      checked={checkedState}
      readOnly={readOnlySignal?.value ?? false}
    />
  ) : null;

  return useRenderedMarkup<RadioItemRenderProps, RadioItemElementProps>({
    wrapperElement: 'label',
    renderProps: {
      checked: checkedState,
      readOnly: readOnlySignal?.value ?? false,
    },
    elementProps: {
      htmlFor: finalId,
    },
    className,
    innerWrapperElement: hiddenField,
    children,
  });
};

const RadioItem = memo(RadioItemComponent);
export { RadioItem };
