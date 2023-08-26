import { schema } from 'components';
const { create: { CreateLocationForm } } = schema;

export default function Page(): React.ReactElement {
	return (
		<CreateLocationForm />
	);
}
