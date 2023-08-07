'use client';

import React from 'react';
import type { Maybe, Opt } from '../../utils';
import { CONTEXT } from './context';
import { Modal, type Props as ModalProps } from '../modal';
import { type ClassName } from '../props-with';
import { type State } from './state';

/**
 * A handler for API {@link State} changes.
 * @param api the {@link State} of the API being used.
 */
export type HandleSetApi = (api: State) => void;

/** Properties which accept a {@link HandleSetApi | API set handler}. */
type SetApiProps = { onSetApi: HandleSetApi };

/** Properties used by {@link Modal}s in the {@link Selector}. */
type SelectorModalProps = Omit<ModalProps & SetApiProps, 'children'>;

/** @return the {@link Modal} to use when connecting to the {@link State | API}. */
function ConnectModal(props: SelectorModalProps): React.ReactElement {
	const [INPUT, setInput] = React.useState<Maybe<string>>();
	return (
		<Modal onClose={props.onClose}>
			<p>I'm the connection modal</p>
		</Modal>
	);
}

/** @return the {@link Modal} to use when logging in to the {@link State | API}. */
function LoginModal(props: SelectorModalProps): React.ReactElement {
	return (
		<Modal onClose={props.onClose}>
			<p>I'm the login modal</p>
		</Modal>
	);
}

/** @return an API {@link State} selector. */
export function Selector(props: ClassName<SetApiProps, 'buttonClassName'>): React.ReactElement {
	const [MODAL_VISIBILITY, setModalVisibility] = React.useState<Opt<'connect' | 'login'>>(null);
	const API = React.useContext(CONTEXT);

	let account_button: Maybe<React.ReactElement>;
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
