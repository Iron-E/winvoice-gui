'use client';

import React from 'react';
import { FLEX } from './css';
import { Header, HEADER_CSS } from './header';
import { CONTEXT, type State, Selector as ApiSelector } from './api';

/**
 * A provider for the {@link Context} that wraps around a page.
 * @param children additional elements shown inside this one.
 * @return the API provider for an entire page of the application.
 */
export function Page(props: React.PropsWithChildren<{}>): React.ReactElement {
	const [API, setApi] = React.useState<State>();

	return (
		<CONTEXT.Provider value={API}>
			<Header>
				<div className={FLEX}>
					<ApiSelector buttonClassName={HEADER_CSS.button} onSetApi={setApi} />
				</div>
			</Header>

			{API == undefined ? <p>Please <b>connect</b> and <b>sign in</b> to continue.</p> : props.children}
		</CONTEXT.Provider>
	);
}
