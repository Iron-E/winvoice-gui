/** The error which occurs upon having an unexpected response from a given `winvoice-server` URL input from a user. */
export class UnexpectedResponseError extends Error {
	constructor(url: string) {
		super(`The server at ${url} responded in an unexpected way. \
The URL could be mistyped, or it may be a bug.`
		);
		Object.setPrototypeOf(this, UnexpectedResponseError.prototype);
	}
}
