/** The error which occurs upon having an unexpected response from a given `winvoice-server` URL input from a user. */
export class UnexpectedResponseError extends Error {
	constructor(url: string) {
		super(`The winvoice-server at ${url} responded in an unexpected way. \
It might be running an unsupported API version, or the URL could be mistyped.`
		);
		Object.setPrototypeOf(this, UnexpectedResponseError.prototype);
	}
}
