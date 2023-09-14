import type { Children, Class, On } from "../props-with";

/** A button for a form. */
export function FormButton(props: Children & Class & On<'click', [e: React.MouseEvent]>): React.ReactElement {
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
