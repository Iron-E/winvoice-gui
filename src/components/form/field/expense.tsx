import React from "react";
import type { CompositeProps } from "./props";
import type { Expense, ExpenseValue } from "@/schema";
import { InputMoney } from "./money";
import { InputString } from "./string";
import { Textarea } from "../field";

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Expense} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputExpense(props:
	& Omit<CompositeProps<ExpenseValue>, 'label'>
): React.ReactElement {
	const [CATEGORY, setCategory] = React.useState(props.value?.[0] ?? '');
	const [COST, setCost] = React.useState(props.value?.[1]);
	const [DESCRIPTION, setDescription] = React.useState(props.value?.[2] ?? '');

	return <>
		<InputString
			id={`${props.id}--category`}
			label='Category'
			onChange={category => {
				setCategory(category);
				if (COST != undefined) {
					props.onChange([category, COST, DESCRIPTION]);
				}
			}}
			required={true}
			title='The broad type of expense which this is'
			value={CATEGORY}
		/>

		<InputMoney
			id={`${props.id}--cost`}
			label='Cost'
			onChange={cost => {
				setCost(cost);
				props.onChange([CATEGORY, cost, DESCRIPTION]);
			}}
			value={COST}
		/>

		<Textarea
			id={`${props.id}--description`}
			label='Description'
			onChange={description => {
				setDescription(description);
				if (COST != undefined) {
					props.onChange([CATEGORY, COST, description]);
				}
			}}
			required={true}
			title='A description of the expense'
			value={DESCRIPTION}
		/>
	</>;
}
