import { useEvent, usePropertyChanged, useStateRefInitial } from '@beesoft/common';
import React, {
  type ChangeEvent,
  forwardRef,
  memo,
  type Ref,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo, useRef, useState,
} from 'react';
import { useFieldContext } from 'architecture/hooks/use-field-context/use-field.context.ts';
import type {
  CheckboxCheckState,
  CheckboxElementProps,
  CheckboxProps,
  CheckboxRef,
  CheckboxRenderProps,
} from './checkbox.props.ts';
import { HiddenField } from 'architecture/components/hidden-field/hidden-field.component.tsx';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';
import { type Signal, useSignalEffect } from '@preact/signals-react';
import type { ComparatorFunction } from 'architecture/hooks/use-data-comparator/use-data-comparator.props.ts';
import { useHeadlessContext } from 'architecture/hooks/use-headless-context.ts';

const CheckboxComponent = (props: CheckboxProps, ref: Ref<CheckboxRef>) => {
  const { name, value, checked = false, partial = false, readOnly, onChange, children, className } = props;

  const [nameState, setNameState] = useState(name);
  const [readOnlyState, setReadOnlyState] = useState(readOnly);

  const nameSignal = useRef<Signal<string>>();
  const valueSignal = useRef<Signal<Array<unknown>>>();
  const readOnlySignal = useRef<Signal<boolean>>();
  const useComparator = useRef<Signal<boolean>>();
  const compare = useRef<ComparatorFunction>();

  const headlessContext = useHeadlessContext();
  const fieldContext = useFieldContext();
  const internalId = useId();

  const finalId = useMemo(
    () => fieldContext?.sharedId || props.id || internalId,
    [fieldContext?.sharedId, props.id, internalId]
  );

  const [checkedState, setCheckedState, checkedStateRef] = useStateRefInitial<CheckboxCheckState>({
    checked: false,
    partial: false,
  });

  const checkedProperty = usePropertyChanged(checked);
  const partialProperty = usePropertyChanged(partial);

  useEffect(() => {
    if (checkedState.initial) {
      setCheckedState({
        checked: partial ? false : checked,
        partial,
      });
    } else {
      const newChecked = !checkedProperty.changed ? checkedState.value.checked : checked;
      const newPartial = !partialProperty.changed ? checkedState.value.partial : partial;

      setCheckedState({
        checked: newPartial ? false : newChecked,
        partial: newPartial,
      });
    }
  }, [checked, partial]);

  useEffect(() => {
    if (headlessContext) {
      nameSignal.current = headlessContext['nameSignal'] as Signal<string>;
      valueSignal.current = headlessContext['valueSignal'] as Signal<Array<unknown>>;
      readOnlySignal.current = headlessContext['readOnlySignal'] as Signal<boolean>;
      useComparator.current = headlessContext['useComparator'] as Signal<boolean>;
      compare.current = headlessContext['compare'] as ComparatorFunction;
    }
  }, [headlessContext]);

  useSignalEffect(() => {
    if (useComparator.current?.value && valueSignal.current && compare.current) {
      const compareFunc = compare.current;
      const checked = valueSignal.current.value.some(
        (item) => compareFunc(value, item)
      );
      setCheckedState((prevState) => {
        return {
          ...prevState,
          checked,
        };
      });
    } else {
      const checked = valueSignal.current?.value.some((item) => value === item) ?? false;
      setCheckedState((prevState) => {
        return {
          ...prevState,
          checked,
        };
      });
    }
  });

  useSignalEffect(() => {
    if (nameSignal.current) {
      setNameState(nameSignal.current.value);
    }
  });

  useSignalEffect(() => {
    setReadOnlyState(readOnlySignal.current?.value ?? false);
  });

  const handleChangeEvent = useEvent((event: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = checkedStateRef.current?.value.partial === true ? true : event.target.checked;
    setCheckedState({
      checked: checkedValue,
      partial: false,
    });

    onChange?.({
      originalEvent: event,
      name: nameState,
      value,
      checked: checkedValue,
    });
  });

  const setPartiallyChecked = (partiallyChecked: boolean) => {
    const state: CheckboxCheckState = {
      checked: partiallyChecked ? false : checkedStateRef.current?.value.checked ?? false,
      partial: partiallyChecked,
    };

    setCheckedState(state);
  };

  const setChecked = (checked: boolean) => {
    setCheckedState({
      checked,
      partial: false,
    });
  };

  useImperativeHandle(ref, () => ({
    setPartiallyChecked,
    setChecked,
  }));

  const hiddenField = nameState && (
    <HiddenField
      id={finalId}
      name={nameState}
      type="checkbox"
      checked={checkedState.value.checked}
      readOnly={readOnlyState}
      onChange={handleChangeEvent}
    />
  );

  return useRenderedMarkup<CheckboxRenderProps, CheckboxElementProps>({
    wrapperElement: 'label',
    renderProps: {
      ...checkedState.value,
      readOnly: readOnlyState,
    },
    elementProps: {
      htmlFor: finalId,
    },
    className,
    innerWrapperElement: hiddenField,
    children
  });
};

const Checkbox = memo(forwardRef(CheckboxComponent));
export { Checkbox };
