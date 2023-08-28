import { AsyncOn, Children, Class } from './props-with';

/** A `form` which prevents the page from refreshing on submit. */
export function Form(props: Class & Children & Required<AsyncOn<'submit'>>) {
	return (
		<form className={props.className} onSubmit={async e => { e.preventDefault(); await props.onSubmit(); }}>
			{props.children}
		</form>
	);
}
