import React from 'react';
import type { InputProps } from './props';
import { Input } from '../../form';

/** @returns a duration out of the parameters formatted in such a way that it can be accepted by both {@link https://docs.rs/humantime | humantime} and {@link https://github.com/jkroso/parse-duration | parse-duration} */
function fmtDuration(minutes: number, hours: number, days: number, weeks: number, months: number, years: number): string {
	return `\
		${minutes > 0 ? `${minutes}m ` : ''}\
		${hours > 0 ? `${hours}h ` : ''}\
		${days > 0 ? `${days}d ` : ''}\
		${weeks > 0 ? `${weeks}w ` : ''}\
		${months > 0 ? `${months}months ` : ''}\
		${years > 0 ? `${years}y ` : ''}\
	`.trim();
}

/** @returns `s` rounded to the nearest whole number. */
function toNumber(s: string): number {
	return Math.round(parseFloat(s));
}

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputDuration(props: Omit<InputProps<string>, 'children' | 'value'>): React.ReactElement {
	const [MINUTES, setMinutes] = React.useState(0);
	const [HOURS, setHours] = React.useState(0);
	const [DAYS, setDays] = React.useState(0);
	const [WEEKS, setWeeks] = React.useState(0);
	const [MONTHS, setMonths] = React.useState(0);
	const [YEARS, setYears] = React.useState(0);

	return (
		<div>
			<Input
				id={`${props.id}--years`}
				label={props.label ?? 'ID'}
				onChange={props.onChange && (years => {
					const NUM = toNumber(years);
					setYears(NUM);
					props.onChange!(fmtDuration(MINUTES, HOURS, DAYS, WEEKS, MONTHS, NUM));
				})}
				required={props.required}
				title={props.title}
				type='number'
				value={YEARS}
			/>

			<Input
				id={`${props.id}--months`}
				label={props.label ?? 'ID'}
				onChange={props.onChange && (months => {
					const NUM = toNumber(months);
					setMonths(NUM);
					props.onChange!(fmtDuration(MINUTES, HOURS, DAYS, WEEKS, NUM, YEARS));
				})}
				required={props.required}
				title={props.title}
				type='number'
				value={MONTHS}
			/>

			<Input
				id={`${props.id}--weeks`}
				label={props.label ?? 'ID'}
				onChange={props.onChange && (weeks => {
					const NUM = toNumber(weeks);
					setWeeks(NUM);
					props.onChange!(fmtDuration(MINUTES, HOURS, DAYS, NUM, MONTHS, YEARS));
				})}
				required={props.required}
				title={props.title}
				type='number'
				value={WEEKS}
			/>

			<Input
				id={`${props.id}--days`}
				label={props.label ?? 'ID'}
				onChange={props.onChange && (days => {
					const NUM = toNumber(days);
					setDays(NUM);
					props.onChange!(fmtDuration(MINUTES, HOURS, NUM, WEEKS, MONTHS, YEARS));
				})}
				required={props.required}
				title={props.title}
				type='number'
				value={DAYS}
			/>

			<Input
				id={`${props.id}--hours`}
				label={props.label ?? 'ID'}
				onChange={props.onChange && (hours => {
					const NUM = toNumber(hours);
					setHours(NUM);
					props.onChange!(fmtDuration(MINUTES, NUM, DAYS, WEEKS, MONTHS, YEARS));
				})}
				required={props.required}
				title={props.title}
				type='number'
				value={HOURS}
			/>

			<Input
				id={`${props.id}--minutes`}
				label={props.label ?? 'ID'}
				onChange={props.onChange && (minutes => {
					const NUM = toNumber(minutes);
					setMinutes(NUM);
					props.onChange!(fmtDuration(NUM, HOURS, DAYS, WEEKS, MONTHS, YEARS));
				})}
				required={props.required}
				title={props.title}
				type='number'
				value={MINUTES}
			/>
		</div>
	);
}
