import type { AsyncOn, Children } from './props-with';

export * from './form/field';
export { FormButton } from './form/button';

/** A `form` which prevents the page from refreshing on submit. */
export function Form(props: Children & Required<AsyncOn<'submit'>>): React.ReactElement {
	return (
		<form className='flex flex-col' onSubmit={async e => { e.preventDefault(); await props.onSubmit(); }}>
			{props.children}
		</form>
	);
}
