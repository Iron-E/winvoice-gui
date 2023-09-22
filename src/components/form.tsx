import type { AsyncOn, Children } from './props-with';

export * from './form/button';
export * from './form/contact';
export * from './form/department';
export * from './form/employee';
export * from './form/field';
export * from './form/location';
export * from './form/organization';
export * from './form/role';
export * from './form/user';

/** A `form` which prevents the page from refreshing on submit. */
export function Form(props: Children & Required<AsyncOn<'submit'>>): React.ReactElement {
	return (
		<form className='flex flex-col' onSubmit={async e => { e.preventDefault(); await props.onSubmit(); }}>
			{props.children}
		</form>
	);
}
