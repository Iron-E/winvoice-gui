import { css, propsWith as w } from '../../components';
import { InnerCrudLayout } from './layout/inner';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';

/** @return the layout used for all pages with CRUD logic in the application. */
export default function CrudLayout(props: w.Children): React.ReactElement {
	return <>
		<div className={`${css.FLEX} justify-center`}>
			<InnerCrudLayout
				newLinkChildren={<>
					<PlusIcon className={css.ICON} /> New
				</>}

				searchLinkChildren={<>
					<MagnifyingGlassIcon className={css.ICON} /> Search
				</>}
			/>
		</div>

		<main>
			{props.children}
		</main>
	</>;
}
