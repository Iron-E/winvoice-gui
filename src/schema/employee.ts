import { type Department } from "./department";
import { type Id } from "./id";

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Employee`} type. */
export type Employee = {
	active: boolean,
	department: Department,
	id: Id,
	name: string,
	title: string,
};
