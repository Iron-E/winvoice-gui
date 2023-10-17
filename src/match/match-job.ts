import type { Id } from '@/schema';
import type { Match } from './match';
import type { MatchDepartment } from './match-department';
import type { MatchInvoice } from './match-invoice';
import type { MatchOrganization } from './match-organization';
import type { MatchSet } from './match-set';
import type { MatchStr } from './match-str';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchJob`}. */
export type MatchJob = {
	client?: MatchOrganization,
	/** If present, should be valid input to {@link Date.parse} */
	date_close?: Match<Date>,
	/** If present, should be valid input to {@link Date.parse} */
	date_open?: Match<Date>,
	departments?: MatchSet<MatchDepartment>,
	id?: Match<Id>,
	/** {@link https://docs.rs/humantime/latest/humantime | Human-readable} durations */
	increment?: Match<string>,
	invoice?: MatchInvoice,
	notes?: MatchStr,
	objectives?: MatchStr,
};
