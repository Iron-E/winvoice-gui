'use client';

import React from 'react';
import type { On } from '../../props-with';
import type { Props } from '@/utils';
import { Client } from '../../api';
import { Currency, isLocation, type Location } from '@/schema';
import { Form, FormButton, InputId, InputString } from '../../form';
import { Modal } from '../../modal';
import { Route } from '@/api';
import { SelectCurrency } from '../../form';
import { SHOW_MESSAGE_CONTEXT } from '../../messages';
import { SPACE } from '../../css';

/** @return a {@link React.JSX.IntrinsicElements.form | form} which will create a new {@link Location} on submit. */
export function CreateLocationForm<Ret>(
	props: On<'submit', [l: Location], Ret> & Pick<Props<typeof SelectCurrency>, 'id'>,
): React.ReactElement {
	const CLIENT = React.useContext(Client.CONTEXT);
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);

	const [CURRENCY, setCurrency] = React.useState<Currency>();
	const [NAME, setName] = React.useState<string>();
	const [OUTER, setOuter] = React.useState<Location>();
	const [MODAL, setModal] = React.useState<null | 'new' | 'search'>(null);

	return <>
		<Form onSubmit={async () => {
			const RESULT = await CLIENT.post(
				showMessage,
				Route.Location,
				{ args: [CURRENCY, NAME, OUTER] },
				isLocation,
			);

			if (RESULT !== null) {
				await Promise.resolve(props.onSubmit?.(RESULT));
			}
		}}>
			<SelectCurrency
				id={`${props.id}--currency`}
				onChange={setCurrency}
				title='The currency which is used by this location, if it is different than surrounding locations'
				value={CURRENCY}
			/>

			<InputString
				id={`${props.id}--name`}
				onChange={setName}
				required={true}
				title='The name of the location which is to be created'
				value={NAME}
			/>

			<InputId
				id={`${props.id}--outer`}
				label='Outer Location'
				onNew={setModal}
				onSearch={setModal}
				required={true}
				title='The name of the location which is to be created'
				value={OUTER?.id}
			/>

			<FormButton className={SPACE} />
		</Form>

		{MODAL === 'new'
			? <Modal onClose={() => setModal(null)}>
				<CreateLocationForm id={`${props.id}--outer--form`} onSubmit={setOuter} />
			</Modal>
			: MODAL === 'search' && <Modal onClose={() => setModal(null)}>
				Unimplemented
			</Modal>
		}
	</>;
}
