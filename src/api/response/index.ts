import { type Delete, isDelete } from './delete';

export * from './export';
export * from './login';
export * from './post';
export * from './put';
export * from './who_am_i';
export const isLogout = isDelete;
export const isPatch = isDelete;
export const isVersion = isDelete;
export type Logout = Delete;
export type Patch = Delete;
export type Version = Delete;
export { type Delete, isDelete };
