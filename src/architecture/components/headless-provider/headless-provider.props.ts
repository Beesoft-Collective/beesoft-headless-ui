export interface HeadlessProviderProps<T, RP> {
  props: Record<string, T>;
  renderProps?: RP;
}
