'use client';

import React from 'react';
import type { InputMatchObjectProps } from '../field/match/props';
import type { ReadonlyNonNullUnitArray, Reviver, ValueOf } from '@/utils';
import type { UserInputRoute } from '@/api';
import type { UseTable } from '@/components/table';
import { Form, FormButton } from '../../form';
import { SPACE } from '@/components/css';
import { useApiContext } from '../../api';

/**
 * @param <M> the type which is used to match `<T>`
 * @param <T> the type being matched
 * @param id the HTML `id` of this form.
 * @param Input the fields in the form.
 * @param useTable a function which will {@link UseTable<T>}
 * @param route the API endpoint to perform the search on.
 * @param checkSchema a function to determine if the result of the {@link fetch} returned an expected result.
 */
export function useMatchForm<T extends {}, M extends {}>(
	id: ValueOf<InputMatchObjectProps<M>, 'id'>,
	Input: (props: InputMatchObjectProps<M>) => React.ReactElement,
	[orderedData, table]: ReturnType<UseTable<T>>,
	route: UserInputRoute,
	checkSchema: (json: unknown) => json is T,
	reviver?: Reviver,
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [MATCH, setMatch] = React.useState({} as M);
	const TABLE_REF = React.useRef<HTMLDivElement>(null);

	return <>
		<Form
			onSubmit={async () => {
				const RESULT = await CLIENT.retrieve(showMessage, route, { condition: MATCH }, checkSchema, reviver);
				if (RESULT === null) { return; } else if (RESULT.length < 1) {
					showMessage('info', 'Search returned no results');
				}

				orderedData.setData?.(RESULT as unknown as ReadonlyNonNullUnitArray<T>);
				window.requestAnimationFrame(() => TABLE_REF.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
			}}
		>
			<Input id={`${id}--${route}`} onChange={setMatch} value={MATCH} />
			<FormButton className={SPACE} />
		</Form>

		<div className='max-w-full' ref={TABLE_REF}>
			{table}
		</div>
	</>;
}
