import { type Id } from "../schema";
import { type Match } from "./match";
import { type MatchDepartment } from "./match_department";
import { type MatchInvoice } from "./match_invoice";
import { type MatchOrganization } from "./match_organization";
import { type MatchSet } from "./match_set";
import { type MatchStr } from "./match_str";

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchJob`}. */
export type MatchJob = {
	client?: MatchOrganization,
	/** If present, should be valid input to {@link Date.parse} */
	date_close?: Match<string>,
	/** If present, should be valid input to {@link Date.parse} */
	date_open?: Match<string>,
	departments?: MatchSet<MatchDepartment>,
	id?: Match<Id>,
	/** {@link https://docs.rs/humantime/latest/humantime | Human-readable} durations */
	increment?: Match<string>,
	invoice?: MatchInvoice,
	notes?: MatchStr<string>,
	objectives?: MatchStr<string>,
};
