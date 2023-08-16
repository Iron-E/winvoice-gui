/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::WhoAmI`}. */
export type WhoAmI = {
	username: string,
};

export function isWhoAmI(json: any): json is WhoAmI {
	if (json == undefined) {
		return false;
	}

	return 'username' in json;
}
