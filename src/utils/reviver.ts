/** A function which can be used with {@link JSON.parse} to help deserialize values. */
export type Reviver = NonNullable<Parameters<JSON['parse']>[1]>;

/**
 * @param revivers the {@link Reviver} functions to combine.
 * @returns a function which will call all of the `revivers` in order.
 */
export function chainRevivers(revivers: Reviver[]): Reviver {
	return (key, value) => {
		let v = value;
		for (const r of revivers) {
			v = r(key, v);
			if (v !== value) { break; }
		}
		return v;
	};
}

/** @returns a {@link Reviver} for a {@link Date} with the given `key`. */
export function dateReviver<T>(key: keyof T): Reviver {
	return (k, v) => key === k ? new Date(v) : v;
}
