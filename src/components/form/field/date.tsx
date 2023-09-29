import React from 'react';
import type { InputProps } from './props';
import type { Maybe } from '@/utils';
import { Input } from '../../form';

const MILLISECONDS_PER_MINUTE = 60000;

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string` which can be used to construct a {@link Date}. */
export function InputDate(props: Omit<InputProps<Date>, 'placeholder' | 'value'> & { value?: Date }): React.ReactElement {
	if (props.value != undefined) {
		const TIMESTAMP = props.value.getTime();
		if (!isNaN(TIMESTAMP)) {
			const DATE = new Date(TIMESTAMP - (props.value.getTimezoneOffset() * MILLISECONDS_PER_MINUTE));
			DATE.setMilliseconds(0);

			const ISO_STRING = DATE.toISOString();
			var localDate: Maybe<string> = ISO_STRING.substring(0, ISO_STRING.length - 1);
		}
	}

	return (
		<Input
			id={props.id}
			label={props.label ?? 'Date'}
			onChange={props.onChange && (date => props.onChange!(new Date(date)))}
			required={props.required}
			title={props.title}
			type='datetime-local'
			validateIconRight={props.validateIconRight ?? 'right-7'}
			validateIconTop={props.validateIconTop}
			value={localDate ?? ''}
		/>
	);
}
