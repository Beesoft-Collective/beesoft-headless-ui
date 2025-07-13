import type { RadioGroupProps } from './radio-group.props.ts';
import { type ChangeEvent, memo, useEffect, useMemo } from 'react';
import { type Signal, useSignal } from '@preact/signals-react';
import { HeadlessProvider } from 'architecture/components/headless-provider/headless-provider.component.tsx';
import {
  useDataComparator
} from 'architecture/hooks/use-data-comparator/use-data-comparator.hook.ts';
import { useEvent } from '@beesoft/common';
import type { ComparatorFunction } from 'architecture/hooks/use-data-comparator/use-data-comparator.props.ts';

const RadioGroupComponent = <T,>({
  name,
  value,
  comparator,
  readOnly = false,
  onChange,
  className,
  children
}: RadioGroupProps<T>) => {
  const nameSignal = useSignal<string>();
  const valueSignal = useSignal<T>();
  const readOnlySignal = useSignal<boolean>();
  const useComparator = useSignal<boolean>();
  const compare = useDataComparator(comparator);

  const componentContext = useMemo<Record<string, Signal | ComparatorFunction<T>>>(() => {
    return {
      nameSignal,
      valueSignal,
      readOnlySignal,
      useComparator,
      compare,
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

  useEffect(() => {
    useComparator.value = comparator !== undefined;
  }, [comparator]);

  const handleOnChange = useEvent(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.({
        originalEvent: event,
        name,
        value: valueSignal.value,
      });
    }
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
