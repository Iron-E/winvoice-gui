'use client';

import * as hooks from '@/hooks';
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
	const [MODAL_VISIBLE, setModalVisible] = hooks.useModalVisibility<'new' | 'search'>();
	const [NAME, setName] = React.useState('');
	const [OUTER, setOuter] = React.useState<Location>();

	return <>
		<Form onSubmit={async () => {
			const RESULT = await CLIENT.post(showMessage, Route.Location, { args: [CURRENCY, NAME, OUTER] }, isLocation);
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
				onNew={setModalVisible}
				onSearch={setModalVisible}
				required={true}
				title='The name of the location which is to be created'
				value={OUTER?.id ?? ''}
			/>

			<FormButton className={SPACE} />
		</Form>

		{MODAL_VISIBLE === 'new'
			? <Modal onClose={setModalVisible}>
				<CreateLocationForm id={`${props.id}--outer--form`} onSubmit={l => {
					setOuter(l);
					setModalVisible(null);
				}} />
			</Modal>
			: MODAL_VISIBLE === 'search' && <Modal onClose={setModalVisible}>
				Unimplemented: allow searching for a location and choosing one
			</Modal>
		}
	</>;
}
