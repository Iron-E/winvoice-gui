import type { Children, Class, On } from "../props-with";

/** A button for a form. */
export function FormButton<Ret = never>(props: Children & Class & On<'click', [e: React.MouseEvent], Ret>): React.ReactElement {
	return (
		<button
			className={`border-[1px] \
bg-form-button-bg hover:bg-form-button-bg-hover \
border-form-button-border hover:border-form-button-border-hover \
${props.className}`}
			onClick={props.onClick}
		>
			{props.children ?? 'Submit'}
		</button>
	);
}
