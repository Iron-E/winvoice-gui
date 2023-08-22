'use client';

import React from 'react';
import type { Children } from './props-with';
import type { JsonFields } from '../utils';
import { CLIENT_CONTEXT, SESSION_EXPIRED_CONTEXT, Client, ClientSelector } from './api';
import { FLEX, PAD } from './css';
import { Header, HEADER_CSS } from './header';
import { SHOW_MESSAGE_CONTEXT, Messages, type Message, type ShowMessage } from './messages';

/** @return a guidance message to help users get started using winvoice. */
function Guidance(props: Children): React.ReactElement {
	return (<p>Please <b>{props.children}</b> to continue.</p>);
}

/**
 * A provider for the {@link Context} that wraps around a page.
 * @param children additional elements shown inside this one.
 * @return the API provider for an entire page of the application.
 */
export function Page(props: Children): React.ReactElement {
	const [CLIENT, setClient] = React.useState<Readonly<Client>>();
	const [MESSAGES, setMessages] = React.useState<Message[]>([]);
	const showMessage: ShowMessage = (level, text) => setMessages(
		messages => [{ key: crypto.randomUUID(), level, text }, ...messages],
	);

	React.useEffect(() => {
		const ITEM = localStorage.getItem('client');
		if (ITEM != undefined) {
			try {
				const FIELDS = JSON.parse(ITEM) as JsonFields<Client>;
				const CLIENT = new Client(FIELDS.address);
				CLIENT.setWhoIAm(showMessage).then(b => b && setClient(CLIENT));
			} catch (e: unknown) {
				console.error(e);
			}
		}
	}, []);

	return <>
			<SHOW_MESSAGE_CONTEXT.Provider value={showMessage}>
				<Header>
					<ClientSelector buttonClassName={HEADER_CSS.button} client={CLIENT} onSetClient={c => {
						setClient(c);
						localStorage.setItem('client', JSON.stringify(c));
					}} />
				</Header>

				<div className={PAD}>
					{CLIENT == undefined
						? <Guidance>connect</Guidance>
						: CLIENT.address == undefined
							? <Guidance>sign in</Guidance>
							: <CLIENT_CONTEXT.Provider value={CLIENT}>
								<SESSION_EXPIRED_CONTEXT.Provider value={() => {
									setClient(new Client(CLIENT.address));
									showMessage('info', 'Your session has expired. Please login again.');
								}}>
									{props.children}
								</SESSION_EXPIRED_CONTEXT.Provider>
							</CLIENT_CONTEXT.Provider>
					}
				</div>
			</SHOW_MESSAGE_CONTEXT.Provider>

			<Messages
				className={`fixed ${FLEX} justify-left bottom-0 w-screen h-12 overflow-x-scroll`}
				messages={MESSAGES}
				onHideMessage={key => setMessages(MESSAGES.filter((m) => m.key !== key))}
			/>
	</>;
}
