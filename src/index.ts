// components
import { HeadlessBase } from './architecture/components/headless-base.component.tsx';
import { HeadlessCheckbox } from "./components/form/checkboxes/checkbox/headless-checkbox.component.tsx";
import { HeadlessField } from './architecture/components/headless-field.component.tsx';
import { HeadlessGroup } from "./components/common/group/headless-group.component.tsx";
import { HeadlessLabel } from "./components/common/label/headless-label.component.tsx";
import { HeadlessProvider } from './architecture/components/headless-provider.component.tsx';
import { ItemScroller } from "./components/data/item-scroller/item-scroller.component.tsx";

// functions / hooks
import { useHeadlessContext } from "./architecture/hooks/use-headless-context.ts";
import { useHeadlessGroupContext } from "./architecture/hooks/use-headless-group-context.ts";

// types
import type { ComponentAnimationProps } from "./components/component-interfaces.ts";
import type { FormInputControl, FormInputControlData } from "./components/form/form-control.interface.ts";
import type { HeadlessCheckboxChangeEvent } from "./components/form/checkboxes/headless-checkboxes.interfaces.ts";
import type { HeadlessCheckboxProps } from './components/form/checkboxes/checkbox/headless-checkbox.props.ts';
import type { WithHeadlessChildRenderProp } from "./architecture/headless-interfaces.ts";

import './index.css';

export {
  HeadlessBase,
  HeadlessCheckbox,
  HeadlessField,
  HeadlessGroup,
  HeadlessLabel,
  HeadlessProvider,
  ItemScroller,
  useHeadlessContext,
  useHeadlessGroupContext
};

export type {
  ComponentAnimationProps,
  FormInputControl,
  FormInputControlData,
  HeadlessCheckboxChangeEvent,
  HeadlessCheckboxProps,
  WithHeadlessChildRenderProp
};
