import type { CheckboxGroupContextTypes, CheckboxGroupProps } from './checkbox-group.props.ts';
import { memo, useEffect, useMemo } from 'react';
import { useSignal } from '@preact/signals-react';
import { useDataComparator } from 'architecture/hooks/use-data-comparator/use-data-comparator.hook.ts';
import { useEvent } from '@beesoft/common';
import { HeadlessProvider } from 'architecture/components/headless-provider/headless-provider.component.tsx';
import type { CheckboxChangeEvent } from '../checkboxes.interfaces.ts';

const CheckboxGroupComponent = <T,>({
  name,
  value,
  comparator,
  readOnly = false,
  onChange,
  className,
  children
}: CheckboxGroupProps<T>) => {
  const nameSignal = useSignal<string>();
  const valueSignal = useSignal<Array<T>>();
  const readOnlySignal = useSignal<boolean>();
  const useComparator = useSignal<boolean>();
  const compare = useDataComparator(comparator);

  const onCheckboxChange = useEvent((event?: CheckboxChangeEvent) => {
    if (event) {
      const { checked } = event;
      const eventValue = event.value as T;

      if (valueSignal.value) {
        if (comparator) {
          if (checked) {
            if (valueSignal.value.findIndex((item) => compare(eventValue, item)) === -1) {
              valueSignal.value.push(eventValue);
            }
          } else {
            const newValues = valueSignal.value.filter((item) => !compare(eventValue, item));
            valueSignal.value = [...newValues];
          }
        } else {
          if (checked) {
            // this shouldn't happen, but don't want to have duplicates
            if (valueSignal.value.indexOf(eventValue) === -1) {
              valueSignal.value.push(eventValue);
            }
          } else {
            const newValues = valueSignal.value.filter((item) => item !== eventValue);
            valueSignal.value = [...newValues];
          }
        }
      } else {
        // this shouldn't be required, but I'm doing it just in case
        if (checked) {
          valueSignal.value = [eventValue];
        }
      }
    }

    onChange?.({
      originalEvent: event?.originalEvent,
      name,
      value: valueSignal.value,
    });
  });

  const componentContext = useMemo<Record<string, CheckboxGroupContextTypes<T>>>(() => {
    return {
      nameSignal,
      valueSignal,
      readOnlySignal,
      useComparator,
      compare,
      onCheckboxChange,
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

  return (
    <div className={className}>
      <HeadlessProvider props={componentContext}>
        {children}
      </HeadlessProvider>
    </div>
  );
};

const CheckboxGroup = memo(CheckboxGroupComponent);
export { CheckboxGroup };
