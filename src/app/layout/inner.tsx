'use client';

import {
	api,
	css,
	Header,
	HEADER_CSS,
	Messages,
	propsWith as w,
	SHOW_MESSAGE_CONTEXT,
	type Message,
	type ShowMessage,
} from '@/components';
import React from 'react';
import type { JsonFields } from '@/utils';

/** @return a guidance message to help users get started using winvoice. */
function Guidance(props: w.Children): React.ReactElement {
	return (<p>Please <b>{props.children}</b> to continue.</p>);
}

/**
 * A provider for the {@link Context} that wraps around a page.
 * @param children additional elements shown inside this one.
 * @return the API provider for an entire page of the application.
 */
export function InnerRootLayout(props: w.Children): React.ReactElement {
	const [CLIENT, setClient] = React.useState<Readonly<api.Client>>();
	const [MESSAGES, setMessages] = React.useState<Message[]>([]);
	const showMessage: ShowMessage = (level, text) => setMessages(
		messages => [{ key: crypto.randomUUID(), level, text }, ...messages],
	);

	React.useEffect(() => {
		const ITEM = localStorage.getItem('client');
		if (ITEM != undefined) {
			try {
				const FIELDS = JSON.parse(ITEM) as JsonFields<api.Client>;
				const CLIENT = new api.Client(FIELDS.address);
				CLIENT.setWhoIAm(showMessage).then(b => b && setClient(CLIENT));
			} catch (e: unknown) {
				console.error(e);
			}
		}
	}, []);

	return <>
		<SHOW_MESSAGE_CONTEXT.Provider value={showMessage}>
			<Header>
				<api.ClientSelector buttonClassName={HEADER_CSS.button} client={CLIENT} onSetClient={c => {
					setClient(c);
					localStorage.setItem('client', JSON.stringify(c));
				}} />
			</Header>

			<div className={css.PAD}>
				{CLIENT == undefined
					? <Guidance>connect</Guidance>
					: CLIENT.username == undefined
						? <Guidance>sign in</Guidance>
						: <api.Client.CONTEXT.Provider value={CLIENT}>
							<api.Client.SET_EXPIRED_CONTEXT.Provider value={() => {
								setClient(new api.Client(CLIENT.address));
								showMessage('info', 'Your session has expired. Please login again.');
							}}>
								{props.children}
							</api.Client.SET_EXPIRED_CONTEXT.Provider>
						</api.Client.CONTEXT.Provider>
				}
			</div>
		</SHOW_MESSAGE_CONTEXT.Provider>

		<Messages
			className={`fixed ${css.FLEX} justify-left bottom-0 w-screen h-12 overflow-x-scroll`}
			messages={MESSAGES}
			onHideMessage={key => setMessages(MESSAGES.filter((m) => m.key !== key))}
		/>
	</>;
}
