import React from 'react';
import type { InputProps } from './props';
import { Input } from '../../form';
import { HOVER } from '../../css';

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

function InputNumber(props: InputProps<string>): React.ReactElement {
	return (
		<span className='max-w-[5vmax] [&>*]:max-w-full'>
			<Input
				id={props.id}
				label={props.label ?? 'Duration'}
				onChange={props.onChange}
				required={props.required}
				title={props.title}
				type='number'
				value={props.value}
			/>
		</span>
	);
}

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputDuration(props: InputProps<string>): React.ReactElement {
	const [MINUTES, setMinutes] = React.useState(0);
	const [HOURS, setHours] = React.useState(0);
	const [DAYS, setDays] = React.useState(0);
	const [WEEKS, setWeeks] = React.useState(0);
	const [MONTHS, setMonths] = React.useState(0);
	const [YEARS, setYears] = React.useState(0);

	return <>
		<span className='ml-1'>{props.label}</span>
		<div className={`pl-1 pr-2 py-0.5 ${HOVER} flex flex-row gap-2 border-[1px] border-form-field-border overflow-x-scroll`}>
			<InputNumber
				id={`${props.id}--years`}
				label='Years'
				onChange={props.onChange && (years => {
					const NUM = toNumber(years);
					setYears(NUM);
					props.onChange!(fmtDuration(MINUTES, HOURS, DAYS, WEEKS, MONTHS, NUM));
				})}
				required={props.required}
				title={props.title}
				value={YEARS}
			/>

			<InputNumber
				id={`${props.id}--months`}
				label='Months'
				onChange={props.onChange && (months => {
					const NUM = toNumber(months);
					setMonths(NUM);
					props.onChange!(fmtDuration(MINUTES, HOURS, DAYS, WEEKS, NUM, YEARS));
				})}
				required={props.required}
				title={props.title}
				value={MONTHS}
			/>

			<InputNumber
				id={`${props.id}--weeks`}
				label='Weeks'
				onChange={props.onChange && (weeks => {
					const NUM = toNumber(weeks);
					setWeeks(NUM);
					props.onChange!(fmtDuration(MINUTES, HOURS, DAYS, NUM, MONTHS, YEARS));
				})}
				required={props.required}
				title={props.title}
				value={WEEKS}
			/>

			<InputNumber
				id={`${props.id}--days`}
				label='Days'
				onChange={props.onChange && (days => {
					const NUM = toNumber(days);
					setDays(NUM);
					props.onChange!(fmtDuration(MINUTES, HOURS, NUM, WEEKS, MONTHS, YEARS));
				})}
				required={props.required}
				title={props.title}
				value={DAYS}
			/>

			<InputNumber
				id={`${props.id}--hours`}
				label='Hours'
				onChange={props.onChange && (hours => {
					const NUM = toNumber(hours);
					setHours(NUM);
					props.onChange!(fmtDuration(MINUTES, NUM, DAYS, WEEKS, MONTHS, YEARS));
				})}
				required={props.required}
				title={props.title}
				value={HOURS}
			/>

			<InputNumber
				id={`${props.id}--minutes`}
				label='Minutes'
				onChange={props.onChange && (minutes => {
					const NUM = toNumber(minutes);
					setMinutes(NUM);
					props.onChange!(fmtDuration(NUM, HOURS, DAYS, WEEKS, MONTHS, YEARS));
				})}
				required={props.required}
				title={props.title}
				value={MINUTES}
			/>
		</div>
	</>;
}
