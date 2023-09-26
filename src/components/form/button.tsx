import type { Children, Class, Click } from "../props-with";
import { HOVER } from "../css";

/** The style of a {@link React.JSX.IntrinsicElements.button | button}. */
export const LABEL_BUTTON_STYLE = `px-1 py-0.5 mx-0 my-1 text-xs ${HOVER}` as const;

/** A button for a form. */
export function FormButton(props: Children & Class & Click): React.ReactElement {
	return (
		<button
			className={`mt-1 border-[1px] \
self-center \
bg-form-button-bg disabled:bg-form-button-bg-disabled enabled:hover:bg-form-button-bg-hover \
border-form-button-border hover:border-form-button-border-hover \
${props.className}`}
			onClick={props.onClick && (e => {
				e.preventDefault();
				props.onClick!(e);
			})}
		>
			{props.children ?? 'Submit'}
		</button>
	);
}
