import { type Delete } from './delete';

export type Patch<T> = Delete<T>;
export { type Delete };
export { type Export } from './export';
export { type Get } from './get';
export { type Post } from './post';
