import { css, propsWith as w } from '@/components';
import { InnerCreateLayout } from './layout/inner';

/** @return the layout used for all pages with CRUD logic in the application. */
export default function CreateLayout(props: w.Children): React.ReactElement {
	return <>
		<InnerCreateLayout />
		{props.children}
	</>;
}
