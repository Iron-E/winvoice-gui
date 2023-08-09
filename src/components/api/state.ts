import { Route, request, VERSION } from '../../api';

/**
 * The information which is kept in order to make api requests / provide relevant UI elements (e.g. whether the user is currently signed in).
 */
export class State {
	constructor(
		/** the address of the API */
		public address: string,
		/** the username of the currently logged in user */
		public username?: string,
	) { }

	/**
	 * Send a delete request.
	 * @param route the {@link Route} to send the delete request to.
	 * @param body the request to send.
	 * @return the response from the server.
	 */
	delete(this: State, route: Route, body?: request.Delete): Promise<Response> {
		return fetch(`${this.address}${route}`, {});
	}
}
