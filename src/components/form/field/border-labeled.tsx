'use client';

import React from "react";
import type { Children, Class, Click } from "../../props-with";
import type { ArrayOrUnit, Maybe, Props, ValueOf } from "@/utils";
import { BorderedLabel, FormButton } from "@/components";
import { HOVER } from "@/components/css";

/** Style to allow the border-labeled field to show as a 2×2 grid. */
export const GRID = 'grid grid-rows-[1.5rem_1fr] grid-flow-col gap-x-2' as const;

/** `true` if even, `false` if odd. */
const NESTING_CONTEXT = React.createContext(false);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function BorderLabeledField(props:
	& Children
	& Class
	& {
		button?: ArrayOrUnit<Click & { text: React.ReactNode }>,
		label?: ValueOf<Props<typeof BorderedLabel>, 'label'>,
	}
): React.ReactElement {
	const NESTING = React.useContext(NESTING_CONTEXT);
	let buttons: Maybe<React.ReactElement[]>;
	if (props.button != undefined) {
		const BUTTONS = props.button instanceof Array ? props.button : [props.button];
		buttons = BUTTONS.map((b, i) => (
			<FormButton className={`${HOVER} px-1 py-0.5`} key={i} onClick={b.onClick}>
				{b.text}
			</FormButton>
		));
	}

	return (
		<BorderedLabel
			// GIGA-HACK: there is no way to do even/odd nesting in css!
			className={`flex flex-col justify-between \
min-h-[1.5rem] left-1 mt-4 mb-2 pt-4 pl-1 pr-3 \
${NESTING ? 'bg-bordered-label-nested-bg' : 'bg-bordered-label-bg' /* */}
${props.className}`}
			label={props.label}
		>
			<span className='flex absolute gap-1 top-[-1.1rem] right-2 text-xs'>
				{buttons}
			</span>

			<NESTING_CONTEXT.Provider value={!NESTING}>
				{props.children}
			</NESTING_CONTEXT.Provider>
		</BorderedLabel>
	);
}
