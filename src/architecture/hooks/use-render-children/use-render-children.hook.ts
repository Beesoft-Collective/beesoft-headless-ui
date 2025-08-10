import type { RenderChildrenProps } from 'architecture/hooks/use-render-children/use-render-children.props.ts';

const useRenderChildren = <RP = undefined,>({ renderProps, children }: RenderChildrenProps<RP>) => {
  return typeof children === 'function' ? children(renderProps) : children;
};

export { useRenderChildren };
