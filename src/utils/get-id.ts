/**
 * @param value what to get the id of.
 * @returns the id of the `value`
 */
export function getId<Id>(value: { id: Id }): Id {
	return value.id;
}
