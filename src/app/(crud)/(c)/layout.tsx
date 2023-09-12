import { propsWith as w } from '@/components';
import { InnerCreateLayout } from './layout/inner';

/** @returns the layout used for all pages with CRUD logic in the application. */
export default function CreateLayout(props: w.Children): React.ReactElement {
	return <>
		<InnerCreateLayout />
		{props.children}
	</>;
}
