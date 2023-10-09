import type { Children, Class, Click } from "../../props-with";
import type { Props, ValueOf } from "@/utils";
import { BorderedLabel, FormButton } from "@/components";
import { HOVER } from "@/components/css";

/** Style to allow the border-labeled field to show as a 2×2 grid. */
export const GRID = 'grid grid-rows-[1.5rem_1fr] grid-flow-col gap-x-2' as const;

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function BorderLabeledField(props:
	& Children
	& Class
	& {
		button?: Click & { text: React.ReactNode },
		label?: ValueOf<Props<typeof BorderedLabel>, 'label'>,
	}
): React.ReactElement {
	return (
		<BorderedLabel
			className={`flex flex-col justify-between \
min-h-[1.5rem] left-1 mt-4 mb-2 pt-4 pl-1 pr-3 \
bg-bordered-label-bg
[&>&]:bg-bordered-label-nested-bg
[&>&>&]:bg-bordered-label-bg
${props.className}`}
			label={props.label}
		>
			{props.button && (
				<FormButton
					className={`${HOVER} px-1 absolute top-[-1.2rem] right-2`}
					onClick={props.button.onClick}
				>
					{props.button.text}
				</FormButton>
			)}

			{props.children}
		</BorderedLabel>
	);
}
