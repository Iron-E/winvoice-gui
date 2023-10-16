'use client';

import React from 'react';
import type { MatchLocation } from '@/match'
import type { SearchProps } from './props';
import { Form, FormButton } from '../../form';
import { InputMatchLocation } from '../field';
import { Route } from '@/api';
import { SPACE } from '@/components/css';
import { type Location, isLocation } from '@/schema';
import { useApiContext } from '../../api';
import { useLocationTable } from '@/components/table';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchLocation} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchLocationForm(props: SearchProps<Location>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [MATCH, setMatch] = React.useState<MatchLocation>({});
	const [ORDERED_DATA, TABLE] = useLocationTable();
	return <>
		<Form
			onSubmit={async () => {
				const RESULT = await CLIENT.retrieve(showMessage, Route.Location, { condition: MATCH }, isLocation);
				if (RESULT === null) { return; } else if (RESULT.length < 1) {
					showMessage('info', 'Search returned no results');
				}

				ORDERED_DATA.setData?.(RESULT);
			}}
		>
			<InputMatchLocation
				id={`${props.id}--department`}
				onChange={setMatch}
				value={MATCH}
			/>

			<FormButton className={SPACE} />
		</Form>
		{TABLE}
	</>;
}
