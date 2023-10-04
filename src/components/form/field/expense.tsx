import React from "react";
import type { CompositeProps } from "./props";
import type { Expense } from "@/schema";
import { InputMoney } from "./money";
import { InputString } from "./string";
import { Textarea } from "../field";

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Expense} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputExpense(props:
	& Omit<CompositeProps<[category: Expense['category'], cost: Expense['cost'], description: Expense['description']]>, 'label'>
): React.ReactElement {
	const [CATEGORY, setCategory] = React.useState(props.value?.[0] ?? '');
	const [COST, setCost] = React.useState(props.value?.[1]);
	const [DESCRIPTION, setDescription] = React.useState(props.value?.[2] ?? '');

	return <>
		<InputString
			id={`${props.id}--category`}
			label='Category'
			onChange={setCategory}
			required={true}
			title='The broad type of expense which this is'
			value={CATEGORY}
		/>

		<InputMoney
			id={`${props.id}--date--close`}
			label='Cost'
			onChange={setCost}
			value={COST}
		/>

		<Textarea
			id={`${props.id}--description`}
			label='Description'
			onChange={setDescription}
			required={true}
			title='A description of the expense'
			value={DESCRIPTION}
		/>
	</>;
}
