import type { RadioItemElementProps, RadioItemProps, RadioItemRenderProps } from './radio-item.props.ts';
import { type ChangeEvent, memo, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useHeadlessContext } from 'architecture/hooks/use-headless-context.ts';
import { type Signal, useSignalEffect } from '@preact/signals-react';
import { HiddenField } from 'architecture/components/hidden-field/hidden-field.component.tsx';
import { useFieldContext } from 'architecture/hooks/use-field-context/use-field.context.ts';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';
import type { ComparatorFunction } from 'architecture/hooks/use-data-comparator/use-data-comparator.props.ts';
import { useEvent } from '@beesoft/common';

const RadioItemComponent = ({ value, className, children }: RadioItemProps) => {
  const [name, setName] = useState<string>();
  const [checkedState, setCheckedState] = useState(false);

  const nameSignal = useRef<Signal<string>>();
  const valueSignal = useRef<Signal<unknown>>();
  const readOnlySignal = useRef<Signal<boolean>>();
  const useComparator = useRef<Signal<boolean>>();
  const compare = useRef<ComparatorFunction>();

  const headlessContext = useHeadlessContext();
  const fieldContext = useFieldContext();
  const internalId = useId();

  const finalId = useMemo(
    () => fieldContext?.sharedId || internalId,
    [fieldContext?.sharedId, internalId]
  );

  useEffect(() => {
    if (headlessContext) {
      nameSignal.current = headlessContext['nameSignal'] as Signal<string>;
      valueSignal.current = headlessContext['valueSignal'] as Signal<unknown>;
      readOnlySignal.current = headlessContext['readOnlySignal'] as Signal<boolean>;
      useComparator.current = headlessContext['useComparator'] as Signal<boolean>;
      compare.current = headlessContext['compare'] as ComparatorFunction;
    }
  }, [headlessContext]);

  useSignalEffect(() => {
    if (useComparator && valueSignal.current && compare.current) {
      setCheckedState(compare.current(value, valueSignal.current.value));
    } else {
      setCheckedState(value === valueSignal.current?.value);
    }
  });

  useSignalEffect(() => {
    setName(nameSignal.current?.value);
  });

  const handleOnChange = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && valueSignal.current) {
      valueSignal.current.value = value;
    }
  });

  const hiddenField = name ? (
    <HiddenField
      id={finalId}
      name={name}
      type="radio"
      value={value as string | number}
      checked={checkedState}
      readOnly={readOnlySignal.current?.value ?? false}
      onChange={handleOnChange}
    />
  ) : null;

  return useRenderedMarkup<RadioItemRenderProps, RadioItemElementProps>({
    wrapperElement: 'label',
    renderProps: {
      checked: checkedState,
      readOnly: readOnlySignal.current?.value ?? false,
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
