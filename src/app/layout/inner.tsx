'use client';

import React from 'react';
import type { JsonFields, Maybe, Opt } from '@/utils';
import {
	Client,
	css,
	Header,
	HEADER_CSS,
	Messages,
	propsWith as w,
	SHOW_MESSAGE_CONTEXT,
	type Message,
	type ShowMessage,
} from '@/components';
import { ClientSelector } from '@/components/api/client/selector';

/**
 * @param defaultAddress the winvoice-server to connect to if the user has no previous session
 * @param sessionClient the user's connection from the previous session
 *
 * @returns a {@link Client} from either of the following are valid, otherwise `undefined`:
 * 1. the user's {@link sessionClient | previous session}, or
 * 2. the {@link defaultAddress}
 *
 * @throws {@link SyntaxError} if {@link sessionClient} fails to parse
 */
function getClient(sessionClient: Opt<string>, defaultAddress?: string): Maybe<Client> {
	if (sessionClient != undefined) { // no session url
		const FIELDS: JsonFields<Client> = JSON.parse(sessionClient);
		return new Client(FIELDS.address);
	} else if (!(defaultAddress == undefined || defaultAddress.length < 1)) { // default url
		return new Client(defaultAddress);
	}

	return;
}

/** @returns a guidance message to help users get started using winvoice. */
function Guidance(props: w.Children): React.ReactElement {
	return (<p>Please <b>{props.children}</b> to continue.</p>);
}

/**
 * A provider for the {@link Context} that wraps around a page.
 * @param children additional elements shown inside this one.
 * @returns the API provider for an entire page of the application.
 */
export function InnerRootLayout(props: w.Children): React.ReactElement {
	const [CLIENT, setClient] = React.useState<Readonly<Client>>();
	const [MESSAGES, setMessages] = React.useState<Message[]>([]);
	const showMessage: ShowMessage = (level, text) => setMessages(
		messages => [{ key: crypto.randomUUID(), level, text }, ...messages],
	);

	React.useEffect(() => {
		try {
			// @ts-ignore
			const DEFAULT_SERVER_ADDR = process.env.NEXT_PUBLIC_DEFAULT_SERVER_ADDR;
			const SESSION_CLIENT = localStorage.getItem('client');
			console.log(DEFAULT_SERVER_ADDR);

			const CLIENT = getClient(SESSION_CLIENT, DEFAULT_SERVER_ADDR);
			CLIENT?.setWhoIAm(showMessage).then(b => b && setClient(CLIENT));
		} catch (e: unknown) {
			console.error(e);
		}
	}, []);

	return <>
		<SHOW_MESSAGE_CONTEXT.Provider value={showMessage}>
			<Header>
				<ClientSelector
					buttonClassName={HEADER_CSS.button}
					client={CLIENT}
					onSetClient={c => {
						setClient(c);
						localStorage.setItem('client', JSON.stringify(c));
					}}
				/>
			</Header>

			<div className={css.PAD}>
				{CLIENT == undefined ? <Guidance>connect</Guidance> : CLIENT.user == undefined
					? <Guidance>sign in</Guidance> : (
						<Client.CONTEXT.Provider value={CLIENT}>
							{props.children}
						</Client.CONTEXT.Provider>
					)
				}
			</div>
		</SHOW_MESSAGE_CONTEXT.Provider>

		<Messages
			className={`fixed ${css.FLEX} justify-left bottom-0 w-screen h-12 overflow-x-scroll z-50`}
			messages={MESSAGES}
			onHideMessage={key => setMessages(MESSAGES.filter(m => m.key !== key))}
		/>
	</>;
}
