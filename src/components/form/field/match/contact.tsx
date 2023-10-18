import type { Fn } from "@/utils";
import { BorderLabeledField } from "../border-labeled";
import { InputMatchLocation } from "./location";
import { InputMatchObjectProps } from "./props";
import { InputMatchStr } from "../match";
import { MatchContact, MatchContactKind, MatchStr } from "@/match";
import { Select } from "../../field";
import { SelectProps } from "../props";

type Handler = (handler: Fn<[value: MatchContactKind]>, condition: MatchContactKind, kind: MatchContactKinds) => void;

type MatchContactKinds =
	| 'address'
	| 'any'
	| 'email'
	| 'other'
	| 'phone'
	;

const OPTIONS: readonly React.ReactElement[] = [
	<option key='address' value='address'>Address</option>,
	<option key='any' value='any'>Any</option>,
	<option key='email' value='email'>Email</option>,
	<option key='other' value='other'>Other</option>,
	<option key='phone' value='phone'>Phone</option>,
];

/** @returns a {@link Handler} for {@link MatchContactKinds} which relate to a {@link MatchStr}. */
function strHandler(key: Omit<MatchContactKinds, 'address' | 'any'>): Handler {
	return (h, c, o) => {
		h({ [key as MatchContactKinds]: o === 'any' || o === 'address' ? 'any' : c } as MatchContactKind);
	};
}

const KIND_CHANGE_HANDLERS: Readonly<Record<MatchContactKinds, Handler>> = {
	address: h => h({ address: {} }),
	any: h => h('any'),
	email: strHandler('email'),
	other: strHandler('other'),
	phone: strHandler('phone'),
};

function SelectMatchContactKind(props:
	& Pick<SelectProps<MatchContactKind>, 'onChange'>
	& Omit<SelectProps<MatchContactKinds>, 'onChange' | 'value'>
	& { condition: MatchContactKind, value: MatchContactKinds }
): React.ReactElement {
	return (
		<Select
			{...props}
			label='Operator'
			onChange={value => KIND_CHANGE_HANDLERS[value as MatchContactKinds](
				props.onChange,
				props.condition,
				props.value,
			)}
		>
			{OPTIONS}
		</Select>
	);
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
function InputMatchContactKind(props: InputMatchObjectProps<MatchContactKind>): React.ReactElement {
	const VALUE = props.value ?? 'any';
	let children: React.ReactNode;
	let kind: MatchContactKinds;
	if (VALUE === 'any') {
		kind = 'any'
	} else if ('address' in VALUE) {
		kind = 'address';
		children = (
			<BorderLabeledField label='Operand'>
				<InputMatchLocation
					id={`${props.id}--address`}
					onChange={address => props.onChange({ address })}
					value={VALUE.address}
				/>
			</BorderLabeledField>
		);
	} else {
		if ('email' in VALUE) {
			kind = 'email'
		} else if ('other' in VALUE) {
			kind = 'other'
		} else {
			kind = 'phone'
		}

		children = (
			<InputMatchStr
				id={`${props.id}--${kind}`}
				label='Operand'
				onChange={value => props.onChange({ [kind]: value } as MatchContactKind)}
				value={(VALUE as Record<typeof kind, MatchStr>)[kind]}
			/>
		);
	}

	return <BorderLabeledField label='Kind'>
		<SelectMatchContactKind
			condition={VALUE}
			id={`${props.id}--select`}
			onChange={props.onChange}
			title=''
			value={kind}
		/>

		{children}
	</BorderLabeledField>
}


/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchContact(props: InputMatchObjectProps<MatchContact>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<InputMatchContactKind
			id={`${props.id}--kind`}
			onChange={kind => props.onChange({ ...VALUE, kind })}
			value={VALUE.kind}
		/>

		<InputMatchStr
			id={`${props.id}--label`}
			label='Label'
			onChange={label => props.onChange({ ...VALUE, label })}
			value={VALUE.label ?? 'any'}
		/>
	</>;
}
