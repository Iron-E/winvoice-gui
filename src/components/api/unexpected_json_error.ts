/** The error which occurs upon having a parse error on the JSON from a URL input by the user. */
export class UnexpectedJsonError extends Error {
	constructor(url: string) {
		super(`The winvoice-server at ${url} responded OK but delivered unaccounted-for content. \
It might be running an unsupported API version, or the URL could be mistyped.`
		);
		Object.setPrototypeOf(this, UnexpectedJsonError.prototype);
	}
}
