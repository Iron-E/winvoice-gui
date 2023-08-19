'use client';

import React from 'react';
import type { AsyncOn, Children, Class, On } from '../props-with';
import type { Fn, Maybe, Opt } from '../../utils';
import { Form } from '../form';
import { LabeledInput } from '../labeled-input';
import { Modal, type Props as ModalProps } from '../modal';
import { response, Route, requestInit as apiRequestInit, Code } from '../../api';
import { SHOW_MESSAGE_CONTEXT } from '../messages';
import { UnauthenticatedError } from './unauthenticated_error';
import { UnexpectedResponseError } from './unexpected_response_error';

/** A generic error message, for builtin {@link Error}s that have unhelpful provided messages. */
const GENERIC_ERR_MSG = 'Could not connect to that address, see the console for additional details' as const;

/** {@link Error}s which likely occur due to a misconfigured (or mistyped) API endpoint. */
type ApiError = UnauthenticatedError | UnexpectedResponseError;

/** {@link Error}s which may be `throw`n by {@link fetch}. */
type FetchError = DOMException | TypeError;

/** HTTP methods used by the winvoice-server. */
type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST';

type Request<T> = Promise<T | (ApiError | FetchError)>;

/**
 * The information which is kept in order to make api requests / provide relevant UI elements (e.g. whether the user is currently signed in).
 */
export class Client {
	constructor(
		/** the address of the API */
		public readonly address: string,
		/** the username of the currently logged in user */
		public username?: string,
	) { }

	/**
	 * Make a {@link fetch} request
	 * @param requestInit the HTTP method to send the request with.
	 * @param route the {@link Route} to send the request to.
	 * @param checkSchema ensure that the response body deserializes to
	 */
	public async request<T>(
		this: Readonly<Client>,
		route: Route,
		requestInit: RequestInit & { method: Method },
		checkSchema: (json: unknown) => json is T,
	): Request<T> {
		try {
			const RESULT: Readonly<Response> = await fetch(`${this.address}${route}`, apiRequestInit(requestInit));
			if (RESULT.ok) {
				try {
					const OBJECT = await RESULT.json() as unknown;
					if (checkSchema(OBJECT)) { return OBJECT; }
				} catch { /** NOTE: `!checkSchema` and `SyntaxError` logic are the same */ }
			} else if (RESULT.status === 401) {
				return this.unauthenticated();
			}

			return this.unexpectedResponse();
		} catch (e) {
			return e as FetchError;
		};
	}

	/** An error to communicate that the client is not yet authenticated. */
	public unauthenticated(this: Readonly<Client>): UnauthenticatedError {
		return new UnauthenticatedError(this.address);
	}

	/** An error to communicate that the client received unexpected {@link Response}. */
	public unexpectedResponse(this: Readonly<Client>): UnexpectedResponseError {
		return new UnexpectedResponseError(this.address);
	}

	/**
	 * Send a delete request.
	 * @param route the {@link Route} to send the delete request to.
	 * @param body the request to send.
	 * @return the response from the server, or an error if one occurs.
	 */
	public async login(this: Readonly<Client>, password: string): Promise<response.Login | FetchError | UnexpectedResponseError> {
		const RESULT = await this.request(
			Route.Login,
			{ method: 'GET', headers: { authorization: `Basic ${btoa(`${this.username}:${password}`)}` } },
			response.isLogin,
		);

		return RESULT instanceof UnauthenticatedError ? this.unexpectedResponse() : RESULT;
	}

	/**
	 * Make a request on the {@link Route.Logout}.
	 * @return the response or an error.
	 */
	public async logout(this: Readonly<Client>): Request<response.Logout> {
		return await this.request(Route.Logout, { method: 'GET' }, response.isLogout);
	}

	/**
	 * Make a request on the {@link Route.WhoAmI}.
	 * @return the response or an error.
	 */
	public async whoAmI(this: Readonly<Client>): Request<response.WhoAmI> {
		return await this.request(Route.WhoAmI, { method: 'GET' }, response.isWhoAmI);
	}
}

/** Properties which accept a handler. */
type SelectorProps = Required<On<'setClient', [client: Client]>> & { client?: Client };

/** Properties used by {@link Modal}s in the {@link ClientSelector}. */
type SelectorModalProps = Omit<ModalProps, 'children'> & SelectorProps;

type ClientContext = Readonly<Client>;

/** The context for the currently selected API address. */
export const CLIENT_CONTEXT: Readonly<React.Context<ClientContext>> = React.createContext<ClientContext>(new Client(
	'DEFAULT CLIENT, SHOULD NEVER BE READ',
));

/** Marks the current session as expired. */
export const SESSION_EXPIRED_CONTEXT: Readonly<React.Context<Fn>> = React.createContext<Fn>(() => { });

/** @return A floating form. */
function ModalForm(props: Children & Required<AsyncOn<'submit'> & On<'close'> & { button_text: string }>) {
	return (
		<Modal onClose={props.onClose}>
			<Form onSubmit={props.onSubmit}>
				<div className={`flex flex-col`}>
					{props.children}
				</div>

				<div className='text-center mt-3'>
					<button className='px-1 rounded bg-modal-button-bg shadow-sm'>
						{props.button_text}
					</button>
				</div>
			</Form>
		</Modal>
	);
}

/** @return the {@link Modal} to use when connecting to the {@link State | API}. */
function ConnectModal(props: SelectorModalProps): React.ReactElement {
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [URL, setUrl] = React.useState<string>(props.client?.username || '');

	return (
		<ModalForm button_text='Connect' onClose={props.onClose} onSubmit={async () => {
			const CLIENT: Client = new Client(URL);
			const RESULT = await CLIENT.whoAmI();

			if (RESULT instanceof DOMException || RESULT instanceof TypeError) {
				return showMessage('error', GENERIC_ERR_MSG);
			} else if (RESULT instanceof UnexpectedResponseError) {
				return showMessage('error', RESULT.message);
			} else if (!(RESULT instanceof UnauthenticatedError)) { // the user isn't logged in, which is fine.
				CLIENT.username = RESULT.username;
			}

			props.onSetClient(CLIENT);
			props.onClose();
		}}>
			<LabeledInput
				id='client-connect-addr'
				onChange={setUrl}
				required={true}
				type='url'
				value={URL}
			>
				Address:
			</LabeledInput>
		</ModalForm>
	);
}

/** @return the {@link Modal} to use when logging in to the {@link State | API}. */
function LoginModal(props: SelectorModalProps): React.ReactElement {
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [USERNAME, setUsername] = React.useState<string>(props.client?.username || '');
	const [PASSWORD, setPassword] = React.useState<string>(props.client?.username || '');

	return (
		<ModalForm button_text='Login' onClose={props.onClose} onSubmit={async () => {
			const CLIENT = new Client(props.client!.address, USERNAME);
			const RESULT = await CLIENT.login(PASSWORD);

			if (RESULT instanceof DOMException || RESULT instanceof TypeError) {
				return showMessage('error', GENERIC_ERR_MSG);
			} else if (RESULT instanceof UnexpectedResponseError) {
				return showMessage('error', RESULT.message);
			} else if (RESULT.status.code !== Code.Success) { // the login failed.
				CLIENT.username = undefined;
				return showMessage('error', RESULT.status.message);
			}

			props.onSetClient(CLIENT);
			props.onClose();
		}}>
			<LabeledInput id='client-login-username' inputClassName='mb-2' onChange={setUsername} required={true} type='text' value={USERNAME}>
				Username
			</LabeledInput>

			<LabeledInput id='client-login-password' onChange={setPassword} required={true} type='password' value={PASSWORD}>
				Password
			</LabeledInput>
		</ModalForm>
	);
}

/** @return an API {@link State} selector. */
export function ClientSelector(props: Class<'button'> & SelectorProps): React.ReactElement {
	const [MODAL_VISIBILITY, setModalVisibility] = React.useState<Opt<'connect' | 'login'>>(null);
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const CLIENT = props.client;

	let account_button: Maybe<React.ReactElement>;
	if (CLIENT != undefined) {
		props.client
		let [content, onClick] = CLIENT.username == undefined
			? ['Login', () => setModalVisibility('login')]
			: ['Logout', async () => {
				const RESULT = await CLIENT.logout();

				if (RESULT instanceof DOMException || RESULT instanceof TypeError) {
					return showMessage('error', GENERIC_ERR_MSG);
				} else if (RESULT instanceof UnauthenticatedError) {
					return showMessage('warn', RESULT.message);
				} else if (RESULT instanceof UnexpectedResponseError) {
					return showMessage('error', RESULT.message);
				} else if (RESULT.status.code !== Code.Success) {
					return showMessage('error', RESULT.status.message);
				}

				props.onSetClient(new Client(CLIENT.address));
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

			{MODAL && <MODAL client={props.client} onClose={() => setModalVisibility(null)} onSetClient={props.onSetClient} />}
		</>
	);
}
