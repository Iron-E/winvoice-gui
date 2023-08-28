import { css, propsWith as w } from '@/components';

/** @return the layout used for all pages with CRUD logic in the application. */
export default function CrudLayout(props: w.Children): React.ReactElement {
	return (
		<main className={`${css.FLEX} justify-center`}>
			{props.children}
		</main>
	);
}
