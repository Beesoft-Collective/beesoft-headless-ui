import type { CalendarContextTypes, CalendarProps, CalendarRenderProps } from './calendar.props.ts';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { type Locale } from 'date-fns';
import {
  type DayType,
  getMonthMatrix,
  getTranslatedDays,
  loadLocale,
  parseDate,
} from '../../../common/functions/date-time-functions.ts';
import { getBrowserLanguage } from '../../../common/functions/common-functions.ts';
import { type TypeOrArray, useDeepEffect, useEvent } from '@beesoft/common';
import { useSignal } from '@preact/signals-react';
import { useRenderedMarkup } from 'architecture/hooks/use-rendered-markup/use-rendered-markup.hook.tsx';
import { HeadlessProvider } from 'architecture/components/headless-provider/headless-provider.component.tsx';

const CalendarComponent = ({
  viewDate = new Date(),
  value,
  localeCode = getBrowserLanguage(),
  readOnly = false,
  onChange,
  className,
  children,
}: CalendarProps) => {
  const [readOnlyState, setReadOnlyState] = useState(readOnly);
  const [monthMatrix, setMonthMatrix] = useState<Array<Array<DayType>>>();
  const [loadedLocale, setLoadedLocale] = useState<Locale>();

  const daysOfTheWeek = useRef<Array<string>>();

  const viewDateSignal = useSignal<Date>();
  const valueSignal = useSignal<TypeOrArray<Date>>();
  const readOnlySignal = useSignal<boolean>();
  const monthMatrixSignal = useSignal<Array<Array<DayType>>>();

  const componentContext = useMemo<Record<string, CalendarContextTypes>>(() => {
    return {
      viewDateSignal,
      valueSignal,
      readOnlySignal,
      monthMatrixSignal,
      onChange,
    };
  }, []);

  const loadLocaleObject = useEvent(async () => {
    return await loadLocale(localeCode);
  });

  useEffect(() => {
    loadLocaleObject()
      .then((localeObject) => {
        daysOfTheWeek.current = getTranslatedDays(localeObject);
        setLoadedLocale(localeObject);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (viewDate && loadedLocale) {
      setMonthMatrix(getMonthMatrix(viewDate, loadedLocale));
    }
  }, [viewDate, loadedLocale]);

  useEffect(() => {
    viewDateSignal.value = viewDate;
  }, [viewDate]);

  useEffect(() => {
    // TODO needs to work with date ranges
    valueSignal.value = typeof value === 'string' ? parseDate(value) : value;
  }, [value]);

  useEffect(() => {
    readOnlySignal.value = readOnly
    setReadOnlyState(readOnly);
  }, [readOnly]);

  useDeepEffect(() => {
    monthMatrixSignal.value = monthMatrix;
  }, [monthMatrix]);

  const finalChildren = (
    <HeadlessProvider props={componentContext}>
      {children}
    </HeadlessProvider>
  );

  return useRenderedMarkup<CalendarRenderProps>({
    wrapperElement: 'div',
    renderProps: {
      readOnly: readOnlyState,
    },
    className,
    children: finalChildren,
  });
};

const Calendar = memo(CalendarComponent);
export { Calendar };
