import { Department } from "./department";
import { Id } from "./id";

/**
 * Same as {https://github.com/Iron-E/winvoice-schema | `Employee`} type.
 */
export type Employee = {
	active: boolean,
	department: Department,
	id: Id,
	name: string,
	title: string,
};
