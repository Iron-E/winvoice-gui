/**
 * Same as the {@link https://github.com/Iron-E/winvoice-schema | `Id`} type. May parse to a Uuid, but exists as a
 * string to simplify JSON deserialization.
 */
export type Id = string;

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Id}.
 */
export function isId(json: unknown): json is Id {
	return typeof json === 'string';
}
