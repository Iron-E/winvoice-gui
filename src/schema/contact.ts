import { ContactKind } from "./contact/contact_kind";

/**
 * Same as {https://github.com/Iron-E/winvoice-schema | `Contact`} type.
 */
export type Contact = ContactKind & { label: string };
