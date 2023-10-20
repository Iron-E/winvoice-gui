import * as request from './request';

export * as response from './response';
export * from './route';
export * from './status';
export { request };

/** What information is used to spawn a new API request.  */
export type Request<T = never> = Omit<RequestInit, 'body' | 'credentials'> & {
	body?: request.Delete | request.Export | request.Post<T> | request.Patch<T> | request.Put<T>,
	method: 'DELETE' | 'POST' | 'PATCH' | 'PUT',
};

/**
 * @param <BodyInner> the content of e.g. {@link request.Post}, should it be the body.
 * @returns an {@link RequestInit | APi request} which can be passed to {@link fetch}.
 */
export function newRequest<BodyInner>(r: Request<BodyInner>): RequestInit {
	/* body */
	if (r.body != undefined) {
		((r as unknown) as RequestInit).body = JSON.stringify(r.body);
	}

	/* credentials */
	((r as unknown) as RequestInit).credentials = 'include';

	/* headers */
	if (r.headers == undefined) {
		r.headers = {};
	}

	r.headers = {
		...r.headers,
		'api-version': '^0.4',
		'content-type': 'application/json',
	};

	/* final cast */
	return (r as unknown) as RequestInit;
}
