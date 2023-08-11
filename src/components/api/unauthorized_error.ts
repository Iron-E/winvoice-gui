/** The error when the user is not permitted to operate on a resource. */
export class UnauthorizedError extends Error {
	constructor(url: string, method: string, resource: string) {
		super(`The winvoice-server at ${url} responded that the user is not authorized to ${method} ${resource}. Either the URL is mistyped, or they have not  logged in.`);
		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}
}
