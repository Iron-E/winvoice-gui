import { type ContactKind } from "./contact/contact_kind";
export { type ContactKind };

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `Contact`} type.
 */
export type Contact = ContactKind & { label: string };
