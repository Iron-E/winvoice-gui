'use client';

import React from 'react';
import { CLIENT_CONTEXT, Client, ClientSelector } from './api';
import { Header, HEADER_CSS } from './header';
import { type Children } from './props-with';

/**
 * A provider for the {@link Context} that wraps around a page.
 * @param children additional elements shown inside this one.
 * @return the API provider for an entire page of the application.
 */
export function Page(props: Children): React.ReactElement {
	const [CLIENT, setClient] = React.useState<Client>();

	return (
		<CLIENT_CONTEXT.Provider value={CLIENT}>
			<Header>
				<ClientSelector buttonClassName={HEADER_CSS.button} onSetClient={setClient} />
			</Header>

			{CLIENT == undefined ? <p>Please <b>connect</b> and <b>sign in</b> to continue.</p> : props.children}
		</CLIENT_CONTEXT.Provider>
	);
}
