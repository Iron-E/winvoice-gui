import { Currency, type Job } from '@/schema';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::request::Export`}. */
export type Export = Readonly<{
	currency?: Currency,
	jobs: Job[],
}>;
