import type { FieldName } from "./field-name";

/**
 * One of the {@link React.JSX.IntrinsicElements | intrinsic} {@link Element | element}s.
 */
export type IntrinsicElement = keyof React.JSX.IntrinsicElements;

/**
 * Maps one of the {@link intrinsic elements} to one of its particular property types, or `never` if that field does not
 * exist.
 *
 * @example
 * ```typescript
 * type Value = IntrinsicProp<'input, 'value'>; // React.JSX.IntrinsicElements['input']['value'];
 * ```
 */
export type IntrinsicProp<
	ElementName extends keyof React.JSX.IntrinsicElements,
	PropertyName extends FieldName,
> = {
	[key in keyof React.JSX.IntrinsicElements[ElementName]]-?:
		key extends PropertyName
		? React.JSX.IntrinsicElements[ElementName][key]
		: never;
}[keyof React.JSX.IntrinsicElements[ElementName]];
