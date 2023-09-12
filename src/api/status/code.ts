/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::Code`}. */
export enum Code {
	ApiVersionHeaderMissing = 12,
	ApiVersionMismatch = 10,
	BadArguments = 4,
	CryptError = 5,
	Database = 7,
	EncodingError = 6,
	ExchangeError = 15,
	InvalidCredentials = 2,
	SuccessForPermissions = 14,
	Success = 1,
	LoginError = 9,
	Other = 0,
	PasswordExpired = 13,
	PermissionsError = 11,
	SqlError = 8,
	Unauthorized = 3,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Code}.
 */
export function isCode(json: unknown): json is Code {
	return typeof json === 'number' && Code[json] != undefined;
}
