'use client';

import React from 'react';
import { CONTEXT } from './context';
import { type State } from './state';
import { Modal, type HandleClose } from '../modal';

/**
 * A handler for API {@link State} changes.
 * @param api the {@link State} of the API being used.
 */
export type HandleSetApi = (api: State) => void;

/**
 * @return the {@link Modal} to use when connecting to the {@link State | API}.
 */
function ConnectModal(props: { onClose: HandleClose, onSetApi: HandleSetApi }): React.ReactElement {
	return (
		<Modal onClose={props.onClose}>
			<p>I'm the connection modal</p>
		</Modal>
	);
}

/**
 * @return the {@link Modal} to use when logging in to the {@link State | API}.
 */
function LoginModal(props: { onClose: HandleClose, onSetApi: HandleSetApi }): React.ReactElement {
	return (
		<Modal onClose={props.onClose}>
			<p>I'm the login modal</p>
		</Modal>
	);
}

/**
 * @param buttonClassName the CSS class used for the buttons.
 * @param onSetApi what to do when the API {@link State} is updated.
 * @return an API {@link State} selector.
 */
export function Selector(props: { buttonClassName?: string, onSetApi: HandleSetApi }): React.ReactElement {
	const [MODAL_VISIBILITY, setModalVisibility] = React.useState<'connect' | 'login' | null>(null);
	const API = React.useContext(CONTEXT);

	let account_button: React.ReactElement | undefined;
	if (API != undefined) {
		let [content, onClick] = API.username == undefined
			? ['Login', () => setModalVisibility('login')]
			: ['Logout', () => {
				console.log('TODO: send `fetch` to logout on `API.address`');
				props.onSetApi({ address: API.address });
			}]
			;

		account_button = (
			<button className={props.buttonClassName} onClick={onClick}>
				{content}
			</button>
		);
	}

	const MODAL = (MODAL_VISIBILITY == 'connect' && ConnectModal) || (MODAL_VISIBILITY == 'login' && LoginModal);
	return (
		<>
			{account_button}
			<button className={props.buttonClassName} onClick={() => setModalVisibility('connect')}>
				Connect
			</button>

			{MODAL && <MODAL onClose={() => setModalVisibility(null)} onSetApi={props.onSetApi} />}
		</>
	);
}
