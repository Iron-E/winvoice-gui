/**
 * The information which is kept in order to make api requests / provide relevant UI elements (e.g. whether the user is currently signed in).
 */
export type State = {
	/** the address of the API */
	address: string,
	/** the username of the currently logged in user */
	username?: string,
};
