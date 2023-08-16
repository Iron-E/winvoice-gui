export * as request from './request';
export * as response from './response';
export { Code, type Status } from './status';
export { Route } from './route';

/** The request header used to indicate the expected API version on the {@link https://github.com/Iron-E/winvoice-sevrer | winvoice-server}. */
export const VERSION_HEADER = 'api-version' as const;
export const VERSION_RANGE = '^0.1' as const;

/** Create headers for an API request. */
export function headers(r: Omit<RequestInit, 'credentials'>): RequestInit {
	(r as RequestInit).credentials = 'include';
	r.headers = r.headers == undefined ?
		{ [VERSION_HEADER]: VERSION_RANGE } :
		{ [VERSION_HEADER]: VERSION_RANGE, ...r.headers };

	return r;
}
