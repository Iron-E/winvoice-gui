import { type Delete } from './delete';

export type Login = Delete;
export type Logout = Delete;
export type Patch = Delete;
export type Version = Delete;
export { type Delete };
export { type Export } from './export';
export { type WhoAmI, isWhoAmI } from './who_am_i';
export { type Get } from './get';
