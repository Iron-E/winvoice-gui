import * as request from './request';

export * as response from './response';
export * from './route';
export * from './status';
export { request };

/** What information is used to spawn a new API request.  */
export type Request<T = never> = Omit<RequestInit, 'body' | 'credentials'> & {
	body?: request.Delete | request.Export | request.Get<T> | request.Patch<T> | request.Post<T>,
	method: 'DELETE' | 'GET' | 'PATCH' | 'POST',
};

/**
 * @param <BodyInner> the content of e.g. {@link request.Get}, should it be the body.
 * @return an {@link RequestInit | APi request} which can be passed to {@link fetch}.
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
		'api-version': '^0.1',
		'content-type': 'application/json',
	};

	/* final cast */
	return (r as unknown) as RequestInit;
}
