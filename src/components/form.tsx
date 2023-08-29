import type { AsyncOn, Children } from './props-with';
import { SPACE } from './css';

/** A `form` which prevents the page from refreshing on submit. */
export function Form(props: Children & Required<AsyncOn<'submit'>>): React.ReactElement {
	return (
		<form className='flex flex-col [&>*:nth-child(even)]:mb-2 [&>button]:mt-1' onSubmit={async e => { e.preventDefault(); await props.onSubmit(); }}>
			{props.children}
		</form>
	);
}

/** A button for a form. */
export function FormButton(props: Children): React.ReactElement {
	return (
		<button className={`${SPACE} border-[1px] bg-form-button-bg hover:bg-form-button-bg-hover border-form-button-border hover:border-form-button-border-hover`}>
			{props.children ?? 'Submit'}
		</button>
	);
}
