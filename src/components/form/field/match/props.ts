import type { CompositeProps } from "../props";
import type { ValueOf } from "@/utils";

/** Properties of an {@link Input} for a match object, e.g. {@link MatchDepartment}. */
export type InputMatchObjectProps<T> =
	& Omit<Required<CompositeProps<T>>, 'label' | 'value'>
	& { value?: ValueOf<CompositeProps<T>, 'value'> }
	;
