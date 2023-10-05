'use client';

import React from "react";
import type { Match } from "@/match";
import type { Maybe } from "@/utils";
import { Form, InputMatch, InputString } from "@/components";

/** This is a test input for {@link F} */
function I(props: any): React.ReactElement {
	return <InputString {...props} value={props.value ?? ''} />;
}

/** This is a test form for {@link Page}. Will be removed once functionality becomes more complete. */
function F(): React.ReactElement {
	const [MATCH, setMatch] = React.useState<Match<Maybe<string>>>('any');
	return (
		<Form onSubmit={async () => { }}>
			<InputMatch<string>
				id='input-match'
				label='asldkj'
				onChange={m => {
					console.log(m);
					setMatch(m);
				}}
				inputField={I}
				value={MATCH}
			/>
		</Form>
	);
}

export default function Page(): React.ReactElement {
	return <>
		<F />
	</>;
}
