export { FormButton } from './form/button';
export { Input, Select } from './form/field';
import type { AsyncOn, Children } from './props-with';

/** A `form` which prevents the page from refreshing on submit. */
export function Form(props: Children & Required<AsyncOn<'submit'>>): React.ReactElement {
	return (
		<form className='flex flex-col [&>*:nth-child(even)]:mb-2 [&>button]:mt-1' onSubmit={async e => { e.preventDefault(); await props.onSubmit(); }}>
			{props.children}
		</form>
	);
}
