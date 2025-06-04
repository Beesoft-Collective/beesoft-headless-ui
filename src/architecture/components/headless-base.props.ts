import { Signal } from '@preact/signals';
import React, { type HTMLInputTypeAttribute, type ReactNode } from 'react';
import type { TypeOrArray } from '@beesoft/common';

/**
 * The child render function used to render custom markup.
 */
export type ChildRenderFunction<RP> = (props: RP) => React.JSX.Element;
export type ChildrenType<RP> = ChildRenderFunction<RP> | TypeOrArray<ReactNode>;

/**
 * This is a basic wrapper around the different core pieces of a headless component.
 */
export interface HeadlessBaseProps<P, RP> {
  /**
   * The id for the input type; this is used by the html for attribute.
   */
  id?: string;
  /**
   * The name of the input; this will be used by a form.
   */
  name?: string;
  /**
   * The backing field to create for the headless component; this will not be needed for every component.
   */
  type?: HTMLInputTypeAttribute;
  /**
   * The properties that need to be sent through the child render function to render the visual part of the component.
   */
  props: P;
  /**
   * The render properties that will be sent to the render function.
   */
  renderProps: RP;
  /**
   * The name (if needed) of the signal required by this component to retrieve data updates.
   */
  signalName?: string;
  /**
   * When the `signalName` is defined this will be called when the Signal object is received.
   * @param {Signal} signal - The signal that belonged to the signal name.
   */
  onSignalRetrieved?: (signal: Signal) => void;
  /**
   * The children property used to render the visual part of the component; this can be used in 2 ways:
   *
   * 1. As a child render function.
   * 2. As a wrapper for custom markup.
   *
   * If the second option is chosen then the className property will be used to style the wrapper and the item(s) passed
   * into the property will be appended to the wrapper.
   */
  children?: ChildRenderFunction<RP> | TypeOrArray<ReactNode>;
  /**
   * Used to potentially add styling to the wrapper element.
   */
  className?: string;
}
