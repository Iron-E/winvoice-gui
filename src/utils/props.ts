/** Get the props accepted by a react component. */
export type Props<T> = T extends (props: infer P extends {}) => any ? P : never;
