import type { RadioGroupProps } from './radio-group.props.ts';
import { type ChangeEvent, memo, useCallback, useEffect, useMemo } from 'react';
import { type Signal, useSignal } from '@preact/signals';
import { HeadlessProvider } from 'architecture/components/headless-provider/headless-provider.component.tsx';

const RadioGroupComponent = ({ name, value, className, onChange, children }: RadioGroupProps) => {
  const nameSignal = useSignal(name);
  const valueSignal = useSignal<unknown>();

  const componentSignals = useMemo<Record<string, Signal>>(() => {
    return {
      nameSignal,
      valueSignal,
    };
  }, []);

  useEffect(() => {
    nameSignal.value = name;
  }, [name]);

  useEffect(() => {
    valueSignal.value = value;
  }, [value]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.({
        originalEvent: event,
        name,
        value: event.target.value,
      });
    },
    [onChange]
  );

  return (
    <div className={className} onChange={handleOnChange}>
      <HeadlessProvider props={componentSignals}>
        {children}
      </HeadlessProvider>
    </div>
  );
};

const RadioGroup = memo(RadioGroupComponent);
export { RadioGroup };
