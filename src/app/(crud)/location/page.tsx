'use client';

import React from "react";
import type { MatchLocation } from "@/match";
import { InputMatchLocation } from "@/components";

export default function Page(): React.ReactElement {
	const [MATCH, setMatch] = React.useState<MatchLocation>({});
	return (
		<>
			<InputMatchLocation
				id='foobar'
				onChange={setMatch}
				value={MATCH}
			/>
		</>
	);
}
