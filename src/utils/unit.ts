/** {@link Unit} with {@link NonNullable} applied. */
export type NonNullUnit<T> = NonNullable<Unit<T>>;

/** An {@link Array} of {@link NonNullUnit<T>}. */
export type NonNullUnitArray<T> = Array<NonNullUnit<T>>;

/** A {@link ReadonlyArray} of {@link NonNullUnit<T>}. */
export type ReadonlyNonNullUnitArray<T> = ReadonlyArray<NonNullUnit<T>>;

/** A {@link ReadonlyArray} of {@link Unit<T>}. */
export type ReadonlyUnitArray<T> = ReadonlyArray<Unit<T>>;

/**
 * Get the underlying type which is being used in an {@link Array}, no matter how nested.
 * NOTE: `Unit` is always safe to compare to nested equivalents; `Unit<T>` = `Unit<Unit<T>>` = `Unit<Unit<…>>`, etc.
 */
export type Unit<T> = T extends Array<infer P> ? Unit<P> : T;

/** An {@link Array} of {@link Unit<T>}. */
export type UnitArray<T> = Array<Unit<T>>;
