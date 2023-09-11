/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::request::Get`}. */
export type Get<Match> = Readonly<{
	condition: Match,
}>;
