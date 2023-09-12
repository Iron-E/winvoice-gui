'use client';

import * as hooks from '@/hooks';
import React from 'react';
import type { AsyncOn, Class, On } from '../props-with';
import type { Fn, Maybe, Opt } from '@/utils';
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, WifiIcon } from '@heroicons/react/20/solid';
import { Code, newRequest, request, response, Route, type Request, type Status, UserInputRoute } from '@/api';
import { Form, FormButton, Input } from '../form';
import { ICON, SPACE } from '../css';
import { Modal, type Props as ModalProps } from '../modal';
import { SHOW_MESSAGE_CONTEXT, type ShowMessage } from '../messages';
import { UnauthenticatedError } from './unauthenticated_error';
import { UnexpectedResponseError } from './unexpected_response_error';

/** A response body (`<T>`) or {@link null} if an error was handled. */
type OptBody<T = unknown> = Promise<Opt<T>>;

/** Whether a request succeeded. */
type RequestSuccess = Promise<boolean>;

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

	/** The context for the currently selected API address. */
	public static readonly CONTEXT: Readonly<React.Context<Readonly<Client>>> = React.createContext<Readonly<Client>>(
		new Client('DEFAULT CLIENT, SHOULD NEVER BE READ'),
	);

	/** Marks the current client's session as expired. */
	public static readonly SET_EXPIRED_CONTEXT: Readonly<React.Context<Fn>> = React.createContext<Fn>(() => { });

	/**
	 * @param <RequestBodyInner> see {@link newRequest}.
	 * @param <ApiResponse> the response which is expected by the server on a success ({@link Response.ok}).
	 * @param requestParams the HTTP method to send the request with.
	 * @param route the {@link Route} to send the request to.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param checkSchema ensure that the response body deserializes to
	 * @returns the response body, or {@link null} if an error was handled.
	 */
	private async caughtRequest<RequestBodyInner = never, ResponseBody extends { status: Status } = { status: Status }>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: Route,
		requestParams: Request<RequestBodyInner>,
		checkSchema: (json: unknown) => json is ResponseBody,
	): OptBody<ResponseBody> {
		const RESULT = await (this as Client).request(showMessage, route, requestParams, checkSchema);
		if (RESULT instanceof UnauthenticatedError) {
			showMessage('error', RESULT.message);
		} else if (RESULT !== null) {
			switch (RESULT.status.code) {
				case Code.SuccessForPermissions: // WARN: fallthrough
					showMessage('warn', RESULT.status.message);
				case Code.Success:
					return RESULT;
				default:
					showMessage('error', RESULT.status.message);
			}
		}

		return null;
	}

	/**
	 * @param <RequestBodyInner> see {@link newRequest}.
	 * @param <ApiResponse> the response which is expected by the server on a success ({@link Response.ok}).
	 * @param requestParams the HTTP method to send the request with.
	 * @param route the {@link Route} to send the request to.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param checkSchema ensure that the response body deserializes to
	 * @returns the response body, {@link null} if an error {@link fetch}ing was handled, or an error if one was unable to be handled in a manner compatible with all possible request purposes.
	 */
	private async request<RequestBodyInner = never, ResponseBody extends {} = {}>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: Route,
		requestParams: Request<RequestBodyInner>,
		checkSchema: (json: unknown) => json is ResponseBody,
	): Promise<Opt<ResponseBody | UnauthenticatedError>> {
		try {
			const RESULT: Readonly<Response> = await fetch(`${this.address}${route}`, newRequest(requestParams));
			if (RESULT.status === 401) {
				return (this as Client).unauthenticated();
			}

			try {
				const OBJECT = await RESULT.json() as unknown;
				if (checkSchema(OBJECT)) {
					return OBJECT;
				}
			} catch {
				// NOTE: `!checkSchema` and `SyntaxError` logic are the same
			}

			showMessage('error', (this as Client).unexpectedResponse().message);
		} catch {
			showMessage('error', `Could not connect to ${this.address}, see the console for details`);
		}

		return null;
	}

	/** An error to communicate that the client is not yet authenticated. */
	private unauthenticated(this: Readonly<Client>): UnauthenticatedError {
		return new UnauthenticatedError(this.address);
	}

	/** An error to communicate that the client received unexpected {@link Response}. */
	private unexpectedResponse(this: Readonly<Client>): UnexpectedResponseError {
		return new UnexpectedResponseError(this.address);
	}

	/**
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param route the {@link Route} to send the request to.
	 * @param body the delete request.
	 * @returns whether the request succeeded.
	 */
	public async delete<RequestBodyInner>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: UserInputRoute,
		body: request.Delete<RequestBodyInner>,
	): RequestSuccess {
		return await (this as Client).caughtRequest(showMessage, route, { method: 'DELETE', body }, response.isDelete) !== null;
	}

	/**
	 * Attempt to login to the {@link Client.address} using the defined {@link Client.username} and `password`.
	 * @param password the user's password.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @returns whether the request succeeded.
	 */
	public async export(this: Readonly<Client>, showMessage: ShowMessage, body: request.Export): OptBody<response.Export['exported']> {
		const RESULT = await (this as Client).caughtRequest(showMessage, Route.Export, { method: 'GET', body }, response.isExport);
		return RESULT && RESULT.exported;
	}

	/**
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param route the {@link Route} to send the request to.
	 * @param body the get request.
	 * @returns whether the request succeeded.
	 */
	public async get<RequestBodyInner, ResponseBody>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: UserInputRoute,
		body: request.Get<RequestBodyInner>,
		checkSchema: (json: unknown) => json is ResponseBody,
	): OptBody<response.Get<ResponseBody>['entities']> {
		const RESULT = await (this as Client).caughtRequest(showMessage, route, { method: 'GET', body }, response.isGet);
		if (RESULT !== null) {
			const IS_EMPTY = RESULT.entities.length < 1;
			if (IS_EMPTY || (!IS_EMPTY && checkSchema(RESULT.entities[0]))) {
				return RESULT.entities as ResponseBody[];
			}
		}

		return null;
	}

	/**
	 * Attempt to login to the {@link Client.address} using the defined {@link Client.username} and `password`.
	 * @param password the user's password.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @returns whether the request succeeded.
	 */
	public async login(this: Readonly<Client>, showMessage: ShowMessage, password: string): RequestSuccess {
		return await (this as Client).caughtRequest(
			showMessage,
			Route.Login,
			{ method: 'GET', headers: { authorization: `Basic ${btoa(`${this.username}:${password}`)}` } },
			response.isDelete,
		) !== null;
	}

	/**
	 * Make a request on the {@link Route.Logout}.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @returns the response or an error.
	 */
	public async logout(this: Readonly<Client>, showMessage: ShowMessage): RequestSuccess {
		return await (this as Client).caughtRequest(showMessage, Route.Logout, { method: 'GET' }, response.isDelete) !== null;
	}

	/**
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param route the {@link Route} to send the request to.
	 * @param body the patch request.
	 * @returns whether the request succeeded.
	 */
	public async patch<RequestBodyInner>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: UserInputRoute,
		body: request.Patch<RequestBodyInner>,
	): RequestSuccess {
		return await (this as Client).caughtRequest(showMessage, route, { method: 'PATCH', body }, response.isPatch) !== null;
	}

	/**
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param route the {@link Route} to send the request to.
	 * @param body the post request.
	 * @returns whether the request succeeded.
	 */
	public async post<RequestBodyInner, ResponseBody extends {}>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: UserInputRoute,
		body: request.Post<RequestBodyInner>,
		checkSchema: (json: unknown) => json is ResponseBody,
	): OptBody<Required<response.Post<ResponseBody>>['entity']> {
		const RESULT = await (this as Client).caughtRequest(showMessage, route, { method: 'POST', body }, response.isPost);
		return (RESULT !== null && checkSchema(RESULT.entity))
			? RESULT.entity
			: null;
	}

	/**
	 * Update `this` {@link Client} based on information from a {@link Route.WhoAmI} request.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @returns whether the request succeeded.
	 */
	public async setWhoIAm(this: Client, showMessage: ShowMessage): RequestSuccess {
		const RESULT = await this.request(showMessage, Route.WhoAmI, { method: 'GET' }, response.isWhoAmI);
		if (RESULT === null) { return false; }

		if (!(RESULT instanceof UnauthenticatedError)) { // the user isn't logged in, which is fine.
			this.username = RESULT.username;
		}

		return true;
	}
}

/** Properties which accept a handler. */
type SelectorProps = Required<On<'setClient', [client: Client]>> & { client?: Readonly<Client> };

/** Properties used by {@link Modal}s in the {@link ClientSelector}. */
type SelectorModalProps = Omit<ModalProps, 'children'> & SelectorProps;

/** @returns A floating form. */
function ModalForm(props: Pick<ModalProps, 'children' | 'onClose'> & Required<AsyncOn<'submit'> & { button_text: string }>) {
	return (
		<Modal onClose={props.onClose}>
			<Form onSubmit={props.onSubmit}>
				{props.children}

				<FormButton className={SPACE}>
					{props.button_text}
				</FormButton>
			</Form>
		</Modal>
	);
}

/** @returns the {@link Modal} to use when connecting to the {@link State | API}. */
function ConnectModal(props: SelectorModalProps): React.ReactElement {
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [URL, setUrl] = React.useState<string>(props.client?.address || '');

	return (
		<ModalForm button_text='Connect' onClose={props.onClose} onSubmit={async () => {
			const CLIENT: Client = new Client(URL);
			if (!await CLIENT.setWhoIAm(showMessage)) { return; }
			props.onSetClient(CLIENT);
			props.onClose(null);
		}}>
			<Input
				id='client-connect-addr'
				label='Address'
				onChange={setUrl}
				required={true}
				title="The winvoice-server's address"
				type='url'
				value={URL}
			/>
		</ModalForm>
	);
}

/** @returns the {@link Modal} to use when logging in to the {@link State | API}. */
function LoginModal(props: SelectorModalProps): React.ReactElement {
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [USERNAME, setUsername] = React.useState<string>(props.client?.username || '');
	const [PASSWORD, setPassword] = React.useState<string>(props.client?.username || '');

	return (
		<ModalForm button_text='Login' onClose={props.onClose} onSubmit={async () => {
			const CLIENT = new Client(props.client!.address, USERNAME);
			if (!await CLIENT.login(showMessage, PASSWORD)) { return; }
			props.onSetClient(CLIENT);
			props.onClose(null);
		}}>
			<Input
				id='client-login-username'
				label='Username'
				onChange={setUsername}
				required={true}
				title='Your username'
				type='text'
				value={USERNAME}
			/>

			<Input
				id='client-login-password'
				label='Password'
				onChange={setPassword}
				required={true}
				title='Your password'
				type='password'
				value={PASSWORD}
			/>
		</ModalForm>
	);
}

/** @returns an API {@link State} selector. */
export function ClientSelector(props: Class<'button'> & SelectorProps): React.ReactElement {
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [MODAL_VISIBLE, setModalVisible] = hooks.useModalVisibility<'connect' | 'login'>();

	const CLIENT = props.client;
	let account_button: Maybe<React.ReactElement>;

	if (CLIENT != undefined) {
		props.client
		let [Icon, content, onClick] = CLIENT.username == undefined
			? [ArrowRightOnRectangleIcon, 'Login', () => setModalVisible('login')]
			: [ArrowLeftOnRectangleIcon, 'Logout', async () => {
				if (!await CLIENT.logout(showMessage)) { return; }
				props.onSetClient(new Client(CLIENT.address));
			}]
			;

		account_button = (
			<button className={props.buttonClassName} onClick={onClick}>
				<Icon className={ICON} /> {content}
			</button>
		);
	}

	const MODAL = (MODAL_VISIBLE == 'connect' && ConnectModal) || (MODAL_VISIBLE == 'login' && LoginModal);
	return <>
		{account_button}
		<button className={props.buttonClassName} onClick={() => setModalVisible('connect')}>
			<WifiIcon className={ICON} /> Connect
		</button>

		{MODAL && <MODAL client={props.client} onClose={setModalVisible} onSetClient={props.onSetClient} />}
	</>;
}
