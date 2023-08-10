/** Either returns an `ok` value, or an `err`or value. */
export type Result<T, E> = { ok: T } | { err: E };
