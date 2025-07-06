import type { ToggleElementProps, ToggleProps, ToggleRef, ToggleRenderProps } from './toggle.props.ts';
import {
  type ChangeEvent,
  forwardRef,
  memo,
  type Ref,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useFieldContext } from 'architecture/hooks/use-field-context/use-field.context.ts';
import { HiddenField } from 'architecture/components/hidden-field/hidden-field.component.tsx';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';

const ToggleComponent = (props: ToggleProps, ref: Ref<ToggleRef>) => {
  const { id, name, value, toggled = false, readOnly, onChange, children, className } = props;

  const [toggledState, setToggledState] = useState(toggled);
  
  const fieldContext = useFieldContext();
  const internalId = useId();
  
  const finalId = useMemo(
    () => fieldContext?.sharedId || id || internalId,
    [fieldContext?.sharedId, id, internalId]
  );

  useEffect(() => {
    setToggledState(toggled);
  }, [toggled]);

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setToggledState(event.target.checked);

    onChange?.({
      originalEvent: event,
      name,
      value,
      checked: event.target.checked,
    });
  };

  const setToggled = (toggled: boolean) => {
    setToggledState(toggled);
  }

  useImperativeHandle(ref, () => ({
    setToggled,
  }));

  const hiddenField = (
    <HiddenField
      id={finalId}
      name={name}
      type="checkbox"
      checked={toggledState}
      readOnly={readOnly}
      onChange={handleChangeEvent}
    />
  );

  return useRenderedMarkup<ToggleRenderProps, ToggleElementProps>({
    wrapperElement: 'label',
    renderProps: {
      toggled: toggledState,
      readOnly,
    },
    elementProps: {
      htmlFor: finalId,
    },
    className,
    innerWrapperElement: hiddenField,
    children,
  });
};

const Toggle = memo(forwardRef(ToggleComponent));
export { Toggle };
