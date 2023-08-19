'use client';

import React from 'react';
import type { AsyncOn, Children, Class, On } from '../props-with';
import type { Fn, Maybe, Opt } from '../../utils';
import { Form } from '../form';
import { LabeledInput } from '../labeled-input';
import { Modal, type Props as ModalProps } from '../modal';
import { response, Route, newRequest, Code, type Request } from '../../api';
import { SHOW_MESSAGE_CONTEXT, type ShowMessage } from '../messages';
import { UnauthenticatedError } from './unauthenticated_error';
import { UnexpectedResponseError } from './unexpected_response_error';

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
	 * Attempt to login to the {@link Client.address} using the defined {@link Client.username} and `password`.
	 * @param password the user's password.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @return whether the request succeeded.
	 */
	public async login(this: Readonly<Client>, showMessage: ShowMessage, password: string): Promise<boolean> {
		const RESULT = await this.request(
			Route.Login,
			{ method: 'GET', headers: { authorization: `Basic ${btoa(`${this.username}:${password}`)}` } },
			showMessage,
			response.isLogin,
		);

		if (RESULT instanceof UnauthenticatedError) {
			showMessage('error', this.unexpectedResponse().message);
		} else if (RESULT !== null) {
			if (RESULT.status.code === Code.Success) {
				return true;
			}

			showMessage('error', RESULT.status.message);
		}

		return false;
	}

	/**
	 * Make a request on the {@link Route.Logout}.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @return the response or an error.
	 */
	public async logout(this: Readonly<Client>, showMessage: ShowMessage): Promise<boolean> {
		const RESULT = await this.request(Route.Logout, { method: 'GET' }, showMessage, response.isLogout);

		if (RESULT instanceof UnauthenticatedError) {
			showMessage('warn', RESULT.message);
		} else if (RESULT !== null) {
			if (RESULT.status.code === Code.Success) {
				return true;
			}

			showMessage('error', RESULT.status.message);
		}

		return false;
	}

	/**
	 * Make a {@link fetch} request
	 * @param <RequestBodyInner> see {@link newRequest}.
	 * @param <ApiResponse> the response which is expected by the server on a success ({@link Response.ok}).
	 * @param requestParams the HTTP method to send the request with.
	 * @param route the {@link Route} to send the request to.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param checkSchema ensure that the response body deserializes to
	 */
	public async request<RequestBodyInner = never, ResponseBody = unknown>(
		this: Readonly<Client>,
		route: Route,
		requestParams: Request<RequestBodyInner>,
		showMessage: ShowMessage,
		checkSchema: (json: unknown) => json is ResponseBody,
	): Promise<Opt<ResponseBody | UnauthenticatedError>> {
		try {
			const RESULT: Readonly<Response> = await fetch(`${this.address}${route}`, newRequest(requestParams));
			if (RESULT.ok) {
				try {
					const OBJECT = await RESULT.json() as unknown;
					if (checkSchema(OBJECT)) {
						return OBJECT;
					}
				} catch {
					// NOTE: `!checkSchema` and `SyntaxError` logic are the same
				}
			} else if (RESULT.status === 401) {
				return this.unauthenticated();
			}

			showMessage('error', this.unexpectedResponse().message);
		} catch {
			showMessage('error', `Could not connect to ${this.address}, see the console for details`);
		}

		return null;
	}

	/**
	 * Update `this` {@link Client} based on information from a {@link Route.WhoAmI} request.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @return whether the request succeeded.
	 */
	public async setWhoIAm(this: Client, showMessage: ShowMessage): Promise<boolean> {
		const RESULT = await this.request(Route.WhoAmI, { method: 'GET' }, showMessage, response.isWhoAmI);
		if (RESULT === null) { return false; }

		if (!(RESULT instanceof UnauthenticatedError)) { // the user isn't logged in, which is fine.
			this.username = RESULT.username;
		}

		return true;
	}

	/** An error to communicate that the client is not yet authenticated. */
	public unauthenticated(this: Readonly<Client>): UnauthenticatedError {
		return new UnauthenticatedError(this.address);
	}

	/** An error to communicate that the client received unexpected {@link Response}. */
	public unexpectedResponse(this: Readonly<Client>): UnexpectedResponseError {
		return new UnexpectedResponseError(this.address);
	}
}

/** Properties which accept a handler. */
type SelectorProps = Required<On<'setClient', [client: Client]>> & { client?: Readonly<Client> };

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
			if (!await CLIENT.setWhoIAm(showMessage)) { return; }
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
			if (!await CLIENT.login(showMessage, PASSWORD)) { return; }
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
				if (!await CLIENT.logout(showMessage)) { return; }
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
