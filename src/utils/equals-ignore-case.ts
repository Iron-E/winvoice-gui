/**
 * @return whether `s1` and `s2` are equal, ignoring case.
 */
export function equalsIgnoreCase(s1: string, s2: string): boolean {
	return s1.localeCompare(s2, undefined, { sensitivity: 'accent' }) === 0;
}
