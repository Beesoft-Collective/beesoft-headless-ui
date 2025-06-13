// components
import { Checkbox } from "./components/form/checkboxes/checkbox/checkbox.component.tsx";
import { Field } from "./components/common/field/field.component.tsx";
import { Label } from "./components/common/label/label.component.tsx";
import { HeadlessProvider } from './architecture/components/headless-provider/headless-provider.component.tsx';
import { ItemScroller } from "./components/data/item-scroller/item-scroller.component.tsx";

// functions / hooks
import { useHeadlessContext } from "./architecture/hooks/use-headless-context.ts";
import { useFieldContextHook } from "./architecture/hooks/use-field-context/use-field-context.hook.ts";

// types
import type { ComponentAnimationProps } from "./components/component-interfaces.ts";
import type { CheckboxChangeEvent } from "./components/form/checkboxes/checkboxes.interfaces.ts";
import type { CheckboxProps } from './components/form/checkboxes/checkbox/checkbox.props.ts';
import type { WithHeadlessChildRenderProp } from "./architecture/headless-interfaces.ts";

import './index.css';

export {
  Checkbox,
  Field,
  Label,
  HeadlessProvider,
  ItemScroller,
  useHeadlessContext,
  useFieldContextHook
};

export type {
  ComponentAnimationProps,
  CheckboxChangeEvent,
  CheckboxProps,
  WithHeadlessChildRenderProp
};
