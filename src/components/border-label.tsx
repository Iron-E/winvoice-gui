import type { Children, Class } from "./props-with";
import { HOVER } from "./css";

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function BorderLabel(props: Children & Class & { label: React.ReactNode }): React.ReactElement {
	return (
		<div className={`${HOVER} border-2 border-black relative ${props.className}`}>
			<span className='absolute top-[-0.8rem] left-2 bg-body-bg'>
				{props.label}
			</span>

			{props.children}
		</div>
	);
}
