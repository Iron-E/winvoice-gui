/** Gets the keys of all the types in a union. */
export type UnionKeys<T> = T extends T ? keyof T : never;
