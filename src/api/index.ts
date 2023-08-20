import * as request from './request';

export * as response from './response';
export { Code, type Status } from './status';
export { request };
export { Route } from './route';

/** What information is used to spawn a new API request.  */
export type Request<T = never> = Omit<RequestInit, 'body' | 'credentials'> & {
	body?: request.Delete | request.Export | request.Get<T> | request.Patch<T> | request.Post<T>,
	method: 'DELETE' | 'GET' | 'PATCH' | 'POST',
};

/** The request header used to indicate the expected API version on the {@link https://github.com/Iron-E/winvoice-sevrer | winvoice-server}. */
export const VERSION_HEADER = 'api-version' as const;
export const VERSION_RANGE = '^0.1' as const;

/**
 * @param <BodyInner> the content of e.g. {@link request.Get}, should it be the body.
 * @return an {@link RequestInit | APi request} which can be passed to {@link fetch}.
 */
export function newRequest<BodyInner>(r: Request<BodyInner>): RequestInit {
	if (r.body != undefined) {
		((r as unknown) as RequestInit).body = JSON.stringify(r.body);
	}

	((r as unknown) as RequestInit).credentials = 'include';
	r.headers = r.headers == undefined ?
		{ [VERSION_HEADER]: VERSION_RANGE } :
		{ [VERSION_HEADER]: VERSION_RANGE, ...r.headers };

	return (r as unknown) as RequestInit;
}
