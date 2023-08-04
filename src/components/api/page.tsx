'use client';

import React from 'react';
import { FLEX } from '../css';
import { Header, HeaderButton } from '../header';

/**
 * The information which is kept in order to make api requests / provide relevant UI elements (e.g. whether the user is currently signed in).
 */
export type State = {
	/** the address of the API */
	address: string,
	/** the username of the currently logged in user */
	username?: string,
};

/** The context for the currently selected API address. */
export const Context = React.createContext<State | undefined>(undefined);

/**
 * A provider for the {@link Context} that wraps around a page.
 * @param props the properties for a page that accesses the api.
 * @return the API provider for an entire page of the application.
 */
export function Page(props: React.PropsWithChildren<{}>): React.ReactElement {
	const [API, setApi] = React.useState<State>();

	return (
		<>
			<Header>
				<div className={`${FLEX}`}>
					{API?.username != undefined && (API?.username == undefined ? <HeaderButton>Login</HeaderButton> : <HeaderButton>Logout</HeaderButton>)}
					<HeaderButton onClick={() => setApi(undefined)}>
						Connect
					</HeaderButton>
				</div>
			</Header>

			<Context.Provider value={API}>
				{props.children}
			</Context.Provider>
		</>
	);
}
