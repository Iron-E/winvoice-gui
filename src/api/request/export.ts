import { Currency, type Job, type Organization } from '../../schema';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::request::Export`}. */
export type Export = {
	currency?: Currency,
	format: 'markdown',
	jobs: Job[],
	organization: Organization,
};
