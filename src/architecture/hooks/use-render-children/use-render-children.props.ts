import type { ChildrenType } from 'architecture/headless-interfaces.ts';

export interface RenderChildrenProps<RP> {
  renderProps?: RP;
  children: ChildrenType<RP>;
}
