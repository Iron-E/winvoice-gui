import { Department } from "./department";
import { Duration } from "./duration";
import { Id } from "./id";
import { Invoice } from "./invoice";
import { Organization } from "./organization";

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `Job`} type.
 */
export type Job = {
	client: Organization,
	date_close?: Date,
	date_open: Date,
	departments: Department[],
	id: Id,
	invoice: Invoice,
	notes: string,
	objectives: string,

	/**
	 * A concrete {@link Duration} or a {@link https://docs.rs/humantime/latest/humantime | human-readable duration}
	 *
	 */
	increment: Duration | string,
};
