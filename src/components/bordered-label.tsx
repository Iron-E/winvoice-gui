import type { Children, Class } from "./props-with";
import { HOVER } from "./css";

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function BorderedLabel(props: Children & Class & { label?: React.ReactNode }): React.ReactElement {
	return (
		<div className={`${HOVER} border-[1px] border-bordered-label-border relative ${props.className}`}>
			{props.label && (
				<span className='absolute border-[1px] border-bordered-label-border px-1 top-[-0.8rem] left-2 bg-body-bg rounded-md'>
					{props.label}
				</span>
			)}

			{props.children}
		</div>
	);
}
