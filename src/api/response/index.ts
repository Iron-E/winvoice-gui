import { type Delete, isDelete } from './delete';

export const isLogin = isDelete;
export const isLogout = isDelete;
export const isPatch = isDelete;
export const isVersion = isDelete;
export type Login = Delete;
export type Logout = Delete;
export type Patch = Delete;
export type Version = Delete;
export { type Delete, isDelete };
export { type Export, isExport } from './export';
export { type Post, isPost } from './post';
export { type Put, isPut } from './put';
export { type WhoAmI, isWhoAmI } from './who_am_i';
