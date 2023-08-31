import { type ContactKind } from './contact/contact-kind';
export { type ContactKind };

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Contact`} type. */
export type Contact = ContactKind & { label: string };

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Contact}.
 */
export function isContact(json: unknown): json is Contact {
	return json instanceof Object && (
		('address' in json && isLocation(json.address))
		|| 'email' in json
		|| 'other' in json
		|| 'phone' in json
	)
}
