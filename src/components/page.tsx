'use client';

import React from 'react';
import { FLEX } from './css';
import { Header, HEADER_CSS } from './header';
import { CONTEXT, type State } from './api';

/**
 * A provider for the {@link Context} that wraps around a page.
 * @param children additional elements shown inside this one.
 * @return the API provider for an entire page of the application.
 */
export function Page(props: React.PropsWithChildren<{}>): React.ReactElement {
	const [API, setApi] = React.useState<State>();

	let account_button: React.ReactElement | undefined;
	if (API != undefined) {
		let content: string | undefined;
		let onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
		if (API.username == undefined) {
			content = 'Login';
			onClick = () => { };
		} else {
			content = 'Login';
			onClick = () => { };
		}

		account_button = <button className={HEADER_CSS.button} onClick={onClick}>{content}</button>;
	}

	return (
		<>
			<Header>
				<div className={`${FLEX}`}>
					{account_button}
					<button className={HEADER_CSS.button} onClick={() => setApi(undefined)}>
						Connect
					</button>
				</div>
			</Header>

			<CONTEXT.Provider value={API}>
				{props.children}
			</CONTEXT.Provider>
		</>
	);
}
