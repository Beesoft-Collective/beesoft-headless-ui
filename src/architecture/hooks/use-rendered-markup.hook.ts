import type { ChildrenType } from '../components/headless-base.props.ts';
import type { TypeOrArray } from '@beesoft/common';
import React, { type ReactNode } from 'react';

const useRenderedMarkup = <RP>(children: ChildrenType<RP>, props?: RP): React.JSX.Element | TypeOrArray<ReactNode> => {
  if (typeof children === 'function') {
    if (!props) {
      throw new Error('Child render props must be defined when using a render function');
    }

    return children(props);
  } else {
    return children;
  }
};

export { useRenderedMarkup };
