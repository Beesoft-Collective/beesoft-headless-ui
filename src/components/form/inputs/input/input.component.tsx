import type { InputComponentState, InputElementProps, InputProps, InputRef, InputRenderProps } from './input.props.ts';
import { forwardRef, memo, type Ref, useImperativeHandle, useRef, useState } from 'react';
import { useEvent } from '@beesoft/common';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';

const InputComponent = (props: InputProps, ref: Ref<InputRef>) => {
  const {
    inputMode,
    readOnly = false,
    placeholder,
    onFocus,
    onBlur,
    onInput,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onPaste,
    className,
    children,
  } = props;

  const [componentState, setComponentState] = useState<InputComponentState>({
    focussed: false,
    blurred: true,
    placeholderShown: false,
  });

  const inputRef = useRef<HTMLElement>(undefined);

  const focusListener = useEvent((event: FocusEvent) => {
    const element = event.target as HTMLElement;
    const value = element.innerHTML;

    if (placeholder && value === placeholder) {
      element.innerHTML = '';
    }

    setComponentState({
      focussed: true,
      blurred: false,
      placeholderShown: false,
    });

    onFocus?.(event);
  });

  const blurListener = useEvent((event: FocusEvent) => {
    const element = event.target as HTMLElement;
    const value = element.innerHTML.trim();

    let placeholderShown = false;
    if (placeholder && (value === '' || value === '<br>')) {
      const element = event.target as HTMLElement;
      element.innerHTML = placeholder;
      placeholderShown = true;
    }

    setComponentState({
      focussed: false,
      blurred: true,
      placeholderShown,
    });

    onBlur?.(event);
  });

  const inputElementCreated = useEvent((element: HTMLElement) => {
    if (placeholder && element && element !== document.activeElement &&
      (element.innerHTML === '' || element.innerText.trim() === ''))
    {
      element.innerHTML = placeholder;
      setComponentState((prevState) => {
        return {
          ...prevState,
          placeholderShown: true,
        };
      });
    }
  });

  const setInnerText = useEvent((value: string) => {
    if (inputRef.current) {
      inputRef.current.innerText = value;
    }
  });

  const setInnerHTML = useEvent((innerHTML: string) => {
    if (inputRef.current) {
      inputRef.current.innerHTML = innerHTML;
    }
  });

  const focus = useEvent(() => {
    inputRef.current?.focus();
  });

  useImperativeHandle(ref, () => ({
    setInnerText,
    setInnerHTML,
    focus,
  }));

  return useRenderedMarkup<InputRenderProps, InputElementProps>({
    wrapperElement: 'div',
    renderProps: {
      readOnly,
      ...componentState
    },
    elementProps: {
      ref: (element) => { if (element) inputElementCreated(element) },
      suppressContentEditableWarning: true,
      contentEditable: !readOnly,
      inputMode,
      onInput,
      onFocus: focusListener,
      onBlur: blurListener,
      onKeyDown,
      onMouseDown,
      onMouseUp,
      onPaste,
    },
    children,
    className,
  });
};

const Input = memo(forwardRef(InputComponent));
export { Input };
