import { css, propsWith as w } from '@/components';
import { InnerCrudLayout } from './layout/inner';

/** @returns the layout used for all pages with CRUD logic in the application. */
export default function CrudLayout(props: w.Children): React.ReactElement {
	return (
		<main className={`${css.FLEX} flex-col justify-center gap-4`}>
			<InnerCrudLayout />
			{props.children}
		</main>
	);
}
