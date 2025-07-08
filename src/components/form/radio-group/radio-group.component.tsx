import type { RadioGroupProps } from './radio-group.props.ts';
import { type ChangeEvent, memo, useCallback, useEffect, useMemo } from 'react';
import { type Signal, useSignal } from '@preact/signals';
import { HeadlessProvider } from 'architecture/components/headless-provider/headless-provider.component.tsx';
import {
  type DataComparator,
  defaultComparator,
} from 'architecture/hooks/use-data-comparator/use-data-comparator.props.ts';

const RadioGroupComponent = <T,>({
  name,
  value,
  comparator = defaultComparator,
  readOnly = false,
  onChange,
  className,
  children
}: RadioGroupProps<T>) => {
  const nameSignal = useSignal(name);
  const valueSignal = useSignal(value);
  const readOnlySignal = useSignal(readOnly);

  const componentContext = useMemo<Record<string, Signal | DataComparator<T>>>(() => {
    return {
      nameSignal,
      valueSignal,
      readOnlySignal,
      comparator,
    };
  }, []);

  useEffect(() => {
    nameSignal.value = name;
  }, [name]);

  useEffect(() => {
    valueSignal.value = value;
  }, [value]);

  useEffect(() => {
    readOnlySignal.value = readOnly;
  }, [readOnly]);

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
      <HeadlessProvider props={componentContext}>
        {children}
      </HeadlessProvider>
    </div>
  );
};

const RadioGroup = memo(RadioGroupComponent);
export { RadioGroup };
