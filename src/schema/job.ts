import { type Department } from "./department";
import { type Id } from "./id";
import { type Invoice } from "./invoice";
import { type Organization } from "./organization";

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Job`} type. */
export type Job = {
	client: Organization,
	date_close?: Date,
	date_open: Date,
	departments: Department[],
	id: Id,
	/** A {@link https://docs.rs/humantime/latest/humantime | human-readable} duration */
	increment: string,
	invoice: Invoice,
	notes: string,
	objectives: string,
};
