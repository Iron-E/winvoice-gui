'use client';

import React from 'react';
import type { ClassName } from '../props-with';
import type { Maybe, Opt } from '../../utils';
import { Code, response, Route, VERSION_HEADER } from '../../api';
import { Modal, type Props as ModalProps } from '../modal';
import { UnauthorizedError } from './unauthorized_error';
import { UnexpectedJsonError } from './unexpected_json_error';
import { UnexpectedResponseError } from './unexpected_response_error';

/**
 * A {@link Promise.catch | catch} for {@link fetch}.
 * @returns the typed error which was caught.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch for why this is safe.
 */
function catch_fetch(e: unknown): DOMException | TypeError {
	return e as DOMException | TypeError;
}


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

	/** An error to communicate that the client is not yet authorized. */
	unauthorized(this: Client, method: 'DELETE' | 'GET' | 'PATCH' | 'POST', resource: string): UnauthorizedError {
		return new UnauthorizedError(this.address, method, resource);
	}

	/** An error to communicate that the client received unexpected {@link JSON}. */
	unexpectedJson(this: Client): UnexpectedJsonError {
		return new UnexpectedJsonError(this.address);
	}

	/** An error to communicate that the client received unexpected {@link Response}. */
	unexpectedResponse(this: Client): UnexpectedResponseError {
		return new UnexpectedResponseError(this.address);
	}

	/**
	 * Send a delete request.
	 * @param route the {@link Route} to send the delete request to.
	 * @param body the request to send.
	 * @return the response from the server, or an error if one occurs.
	 */
	async whoAmI(this: Client): Promise<
		DOMException
		| response.WhoAmI
		| TypeError
		| UnexpectedJsonError
		| UnexpectedResponseError
		| UnauthorizedError
	> {
		const RESULT = await fetch(`${this.address}${Route.WhoAmI}`, {
			method: 'GET',
			headers: {
				...VERSION_HEADER,
			},
		}).catch(catch_fetch);

		if (RESULT instanceof Response) {
			switch (RESULT.status) {
				case 200:
					let json = await RESULT.json();
					if ('username' in json) {
						return json as response.WhoAmI;
					}

					return this.unexpectedJson();
				case 401:
					return this.unauthorized('GET', Route.WhoAmI)
				default:
					return this.unexpectedResponse();
			};
		}

		return RESULT;
	}
}

/**
 * A handler for API {@link State} changes.
 * @param api the {@link State} of the API being used.
 */
export type HandleSetClient = (client: Client) => void;

/** Properties which accept a {@link HandleSetClient | API set handler}. */
type SetClientProps = { onSetClient: HandleSetClient };

/** Properties used by {@link Modal}s in the {@link ClientSelector}. */
type SelectorModalProps = Omit<ModalProps & SetClientProps, 'children'>;

/** The context for the currently selected API address. */
export const CLIENT_CONTEXT = React.createContext<Maybe<Client>>(undefined);

/** The `#id` of the {@link ConnectModal} {@link HTMLInputElement} */
const CONNECT_MODAL_INPUT_ID = 'api-connect-addr' as const;

/** @return the {@link Modal} to use when connecting to the {@link State | API}. */
function ConnectModal(props: SelectorModalProps): React.ReactElement {
	const [URL, setUrl] = React.useState<string>('');

	return (
		<Modal onClose={props.onClose}>
			<form onSubmit={async (e) => {
				e.preventDefault();
				const CLIENT = new Client(URL);
				const RESULT = await CLIENT.whoAmI();

				if (
					RESULT instanceof DOMException
					|| RESULT instanceof TypeError
					|| RESULT instanceof UnexpectedJsonError
					|| RESULT instanceof UnexpectedResponseError
				) {
					console.log('TODO: show error in popup');
					console.debug(RESULT);
				} else { // the user isn't logged in, which is fine.
					if (!(RESULT instanceof UnauthorizedError)) {
						CLIENT.username = RESULT.username;
					}

					props.onSetClient(CLIENT);
					if (props.onClose != undefined) {
						props.onClose();
					}
				}
			}}>
				<label className='mr-2' htmlFor={CONNECT_MODAL_INPUT_ID}>Address:</label>
				<input
					className='p-1 rounded'
					id={CONNECT_MODAL_INPUT_ID}
					name={CONNECT_MODAL_INPUT_ID}
					onChange={(e) => setUrl(e.target.value)}
					required={true}
					type='url'
				/>
				<div className='text-center mt-3'>
					<button className='px-1 rounded bg-white shadow-sm'>
						Connect
					</button>
				</div>
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
export function ClientSelector(props: ClassName<SetClientProps, 'buttonClassName'>): React.ReactElement {
	const [MODAL_VISIBILITY, setModalVisibility] = React.useState<Opt<'connect' | 'login'>>(null);
	const API = React.useContext(CLIENT_CONTEXT);

	let account_button: Maybe<React.ReactElement>;
	if (API != undefined) {
		let [content, onClick] = API.username == undefined
			? ['Login', () => setModalVisibility('login')]
			: ['Logout', () => {
				console.log('TODO: send `fetch` to logout on `API.address`');
				props.onSetClient(new Client(API.address));
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

			{MODAL && <MODAL onClose={() => setModalVisibility(null)} onSetClient={props.onSetClient} />}
		</>
	);
}
