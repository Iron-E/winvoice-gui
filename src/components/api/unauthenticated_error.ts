/** The error when the user is not permitted to operate on a resource. */
export class UnauthenticatedError extends Error {
	constructor(url: string) {
		super(`${url} responded that the you are not authenticated. \
This likely means you are logged out, but could mean that the URL is mistyped.`
		);
		Object.setPrototypeOf(this, UnauthenticatedError.prototype);
	}
}
