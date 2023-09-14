import { isContactKind, type ContactKind, type ContactKinds } from './contact/contact-kind';
export { isContactKind, type ContactKind, type ContactKinds };

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Contact`} type. */
export type Contact = ContactKind & { label: string };

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Contact}.
 */
export function isContact(json: unknown): json is Contact {
	return isContactKind(json) && (
		'label' in json && typeof json.label === 'string'
	)
}
