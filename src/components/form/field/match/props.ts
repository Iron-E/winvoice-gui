import type { CompositeProps } from "../props";

/** Properties of an {@link Input} for a match object, e.g. {@link MatchDepartment}. */
export type InputMatchObjectProps<T> = Omit<Required<CompositeProps<T>>, 'label'>;
