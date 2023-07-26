import { Code } from './status/code';
export { type Code };

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::Status`}. */
export type Status = {
	code: Code,
	message: string,
};
