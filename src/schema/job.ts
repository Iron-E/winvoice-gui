import { fieldMaybeIs } from '@/utils';
import type { Department } from './department';
import { isId, type Id } from './id';
import { isInvoice, type Invoice } from './invoice';
import { isOrganization, type Organization } from './organization';

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

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Job}.
 */
export function isJob(json: unknown): json is Job {
	return json instanceof Object && (
		'client' in json && isOrganization(json.client)
		&& fieldMaybeIs(json, 'date_close', d => d instanceof Date)
		&& 'date_open' in json && json.date_open instanceof Date
		&& 'departments' in json && json.departments instanceof Array
		&& 'id' in json && isId(json.id)
		&& 'increment' in json && typeof json.increment === 'string'
		&& 'invoice' in json && isInvoice(json.invoice)
		&& 'notes' in json && typeof json.notes === 'string'
		&& 'objectives' in json && typeof json.objectives === 'string'
	);
}
