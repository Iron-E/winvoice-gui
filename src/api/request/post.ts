/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::request::Get`}. */
export type Post<Match> = Readonly<{
	condition: Match,
}>;
