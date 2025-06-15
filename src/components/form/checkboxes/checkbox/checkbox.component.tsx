import { usePropertyChanged, useStateRefInitial } from '@beesoft/common';
import React, {
  type ChangeEvent,
  forwardRef,
  memo,
  type Ref,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
} from 'react';
import { useFieldContextHook } from 'architecture/hooks/use-field-context/use-field-context.hook.ts';
import type {
  CheckboxCheckState,
  CheckboxElementProps,
  CheckboxProps,
  CheckboxRef,
  CheckboxRenderProps,
} from './checkbox.props.ts';
import { HiddenField } from 'architecture/components/hidden-field/hidden-field.component.tsx';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';

const CheckboxComponent = (props: CheckboxProps, ref: Ref<CheckboxRef>) => {
  const { name, value, checked = false, partial = false, readOnly, onChange, children, className } = props;

  const fieldContext = useFieldContextHook();
  const internalId = useId();

  const finalId = useMemo(
    () => fieldContext?.sharedId || props.id || internalId,
    [fieldContext?.sharedId || props.id || internalId]
  )

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

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = checkedStateRef.current?.value.partial === true ? true : event.target.checked;
    setCheckedState({
      checked: checkedValue,
      partial: false,
    });

    onChange?.({
      originalEvent: event,
      name: name || event.target.name,
      value,
      checked: checkedValue,
    });
  };

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

  const hiddenField = (
    <HiddenField
      id={finalId}
      name={name}
      type="checkbox"
      checked={checkedState.value.checked}
      readOnly={readOnly}
      onChange={handleChangeEvent}
    />
  );

  return useRenderedMarkup<CheckboxRenderProps, CheckboxElementProps>({
    wrapperElement: 'label',
    renderProps: {
      ...checkedState.value,
      readOnly,
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
