'use client';

import React from 'react';
import { CLIENT_CONTEXT, SESSION_EXPIRED_CONTEXT, Client, ClientSelector } from './api';
import { FLEX } from './css/flex';
import { Header, HEADER_CSS } from './header';
import { SHOW_MESSAGE_CONTEXT, Messages, type Message, type ShowMessage } from './messages';
import { type Children } from './props-with';

/**
 * A provider for the {@link Context} that wraps around a page.
 * @param children additional elements shown inside this one.
 * @return the API provider for an entire page of the application.
 */
export function Page(props: Children): React.ReactElement {
	const [CLIENT, setClient] = React.useState<Client>();
	const [MESSAGES, setMessages] = React.useState<Message[]>([]);

	const showMessage: ShowMessage = (level, text) => setMessages(
		messages => [{ key: crypto.randomUUID(), level, text }, ...messages],
	);

	return (
		<>
			<SHOW_MESSAGE_CONTEXT.Provider value={showMessage}>
				<Header>
					<ClientSelector buttonClassName={HEADER_CSS.button} client={CLIENT} onSetClient={setClient} />
				</Header>

				{CLIENT?.username == undefined
					? <p>Please <b>connect</b> and <b>sign in</b> to continue.</p>
					: <CLIENT_CONTEXT.Provider value={CLIENT}>
						<SESSION_EXPIRED_CONTEXT.Provider value={() => {
							setClient(new Client(CLIENT.address));
							showMessage('info', 'Your session has expired. Please login again.');
						}}>
							{props.children}
						</SESSION_EXPIRED_CONTEXT.Provider>
					</CLIENT_CONTEXT.Provider>
				}
			</SHOW_MESSAGE_CONTEXT.Provider>

			<Messages
				className={`fixed ${FLEX} justify-left bottom-0 w-screen h-12 overflow-x-scroll`}
				messages={MESSAGES}
				onHideMessage={key => setMessages(MESSAGES.filter((m) => m.key !== key))}
			/>
		</>
	);
}
