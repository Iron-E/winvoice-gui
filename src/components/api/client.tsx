'use client';

import React from 'react';
import type { Class, On } from '../props-with';
import type { Maybe, Opt } from '../../utils';
import { LabeledInput } from '../labeled-input';
import { Modal, type Props as ModalProps } from '../modal';
import { response, Route, headers } from '../../api';
import { SHOW_MESSAGE_CONTEXT } from '../messages';
import { UnauthorizedError } from './unauthorized_error';
import { UnexpectedResponseError } from './unexpected_response_error';

/** {@link Error}s which likely occur due to a misconfigured (or mistyped) API endpoint. */
type ApiError = UnexpectedResponseError | UnauthorizedError;

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
	 * @param method the HTTP method to send the request with.
	 * @param route the {@link Route} to send the request to.
	 * @param checkSchema ensure that the response body deserializes to
	 */
	private async request<T>(this: Client, method: Method, route: Route, checkSchema: (json: unknown) => json is T): Request<T> {
		try {
			const RESULT = await fetch(`${this.address}${route}`, headers({ method }));
			if (RESULT.ok) {
				try {
					const OBJECT = await RESULT.json();
					if (checkSchema(OBJECT)) { return OBJECT; }
				} catch { /** NOTE: `!checkSchema` and `SyntaxError` logic are the same */ }
			} else if (RESULT.status === 401) {
				return this.unauthorized(method, route)
			}

			return this.unexpectedResponse();
		} catch (e) {
			return e as FetchError;
		};
	}

	/** An error to communicate that the client is not yet authorized. */
	private unauthorized(this: Client, method: Method, resource: string): UnauthorizedError {
		return new UnauthorizedError(this.address, method, resource);
	}

	/** An error to communicate that the client received unexpected {@link Response}. */
	private unexpectedResponse(this: Client): UnexpectedResponseError {
		return new UnexpectedResponseError(this.address);
	}

	/**
	 * Send a delete request.
	 * @param route the {@link Route} to send the delete request to.
	 * @param body the request to send.
	 * @return the response from the server, or an error if one occurs.
	 */
	public async login(this: Client): Request<response.Login> {
		return await this.request('GET', Route.Login, response.isLogin);
	}

	/**
	 * Make a request on the {@link Route.Logout}.
	 * @return the response or an error.
	 */
	public async logout(this: Client): Request<response.Logout> {
		return await this.request('GET', Route.Logout, response.isLogout);
	}

	/**
	 * Make a request on the {@link Route.WhoAmI}.
	 * @return the response or an error.
	 */
	public async whoAmI(this: Client): Request<response.WhoAmI> {
		return await this.request('GET', Route.WhoAmI, response.isWhoAmI);
	}
}

/** The button used to submit the {@link ConnectModal} and {@link LoginModal} */
const MODAL_BUTTON = (
	<div className='text-center mt-3'>
		<button className='px-1 rounded bg-modal-button-bg shadow-sm'>
			Connect
		</button>
	</div>
);

/** Properties which accept a handler. */
type SetClientProps = Required<On<'setClient', [client: Client]>>;

/** Properties used by {@link Modal}s in the {@link ClientSelector}. */
type SelectorModalProps = Omit<ModalProps & SetClientProps, 'children'>;

/** The context for the currently selected API address. */
export const CLIENT_CONTEXT = React.createContext<Maybe<Client>>(undefined);

/** @return the {@link Modal} to use when connecting to the {@link State | API}. */
function ConnectModal(props: SelectorModalProps & { address: Maybe<Client['address']> }): React.ReactElement {
	const addMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [URL, setUrl] = React.useState<string>(props.address || '');

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={async e => {
				e.preventDefault();
				const CLIENT = new Client(URL);
				const RESULT = await CLIENT.whoAmI();

				if (RESULT instanceof DOMException) {
					addMessage('error', RESULT.message);
				} else if (RESULT instanceof TypeError) {
					addMessage('error', 'Could not connect to that address, see the console for additional details');
				} else if (RESULT instanceof UnexpectedResponseError) {
					addMessage('error', RESULT.message); // *My* errors leave good messages…
				} else { // the user isn't logged in, which is fine.
					if (!(RESULT instanceof UnauthorizedError)) {
						CLIENT.username = RESULT.username;
					}

					props.onSetClient(CLIENT);
					props.onClose?.();
					addMessage('info', 'Connected successfully');
				}
			}}>
				<LabeledInput
					id='api-connect-addr'
					onChange={e => setUrl(e.target.value)}
					required={true}
					type='url'
					value={URL}
				>
					Address:
				</LabeledInput>

				{MODAL_BUTTON}
			</form>
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
export function ClientSelector(props: Class<'button'> & SetClientProps): React.ReactElement {
	const [MODAL_VISIBILITY, setModalVisibility] = React.useState<Opt<'connect' | 'login'>>(null);
	const CLIENT = React.useContext(CLIENT_CONTEXT);

	let account_button: Maybe<React.ReactElement>;
	if (CLIENT != undefined) {
		let [content, onClick] = CLIENT.username == undefined
			? ['Login', () => setModalVisibility('login')]
			: ['Logout', () => {
				console.log('TODO: send `fetch` to logout on `API.address`');
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

			{MODAL && <MODAL address={CLIENT?.address} onClose={() => setModalVisibility(null)} onSetClient={props.onSetClient} />}
		</>
	);
}
