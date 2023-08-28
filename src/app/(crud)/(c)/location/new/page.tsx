'use client';

import { schema } from '@/components';
const { create: { CreateLocationForm } } = schema;

export default function Page(): React.ReactElement {
	return (
		<CreateLocationForm
			id='new-location-form'
			onSubmit={async () => {
				throw new Error('Unimplemented')
			}}
		/>
	);
}
