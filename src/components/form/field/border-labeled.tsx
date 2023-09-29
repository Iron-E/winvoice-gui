import type { Children, Class } from "../../props-with";
import { BorderLabel } from "@/components";

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function BorderLabeledField(props: Children & Class & { label: React.ReactNode }): React.ReactElement {
	return (
		<BorderLabel className={`left-1 mt-4 mb-2 pt-2 pl-1 pr-3 ${props.className}`} label={props.label}>
			{props.children}
		</BorderLabel>
	);
}
