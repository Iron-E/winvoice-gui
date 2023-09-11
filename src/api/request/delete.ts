/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::request::Delete`}. */
export type Delete<T = unknown> = Readonly<{
	entities: readonly T[],
}>;
