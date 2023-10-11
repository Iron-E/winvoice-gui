'use client';

import React from "react";
import type { Match, MatchStr } from "@/match";
import type { Maybe } from "@/utils";
import { Form, InputMatch, InputMatchStr, InputString } from "@/components";

/** This is a test input for {@link F} */
function I(props: any): React.ReactElement {
	return <InputString {...props} value={props.value ?? ''} />;
}

/** This is a test form for {@link Page}. Will be removed once functionality becomes more complete. */
function F(): React.ReactElement {
	const [MATCH, setMatch] = React.useState<Match<Maybe<string>>>('any');
	const [MATCH_STR, setMatchStr] = React.useState<MatchStr>('any');
	return (
		<Form onSubmit={async () => { }}>
			<InputMatch<string>
				id='input-match'
				label='Test'
				onChange={setMatch}
				inputField={I}
				value={MATCH}
			/>

			<InputMatchStr
				id='input-match-str'
				label='Test str'
				onChange={setMatchStr}
				value={MATCH_STR}
			/>
		</Form>
	);
}

export default function Page(): React.ReactElement {
	return <>
		<F />
	</>;
}
