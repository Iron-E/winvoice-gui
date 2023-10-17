'use client'; // TODO: ← is this necessary?

import React from 'react';
import { doNothing, type Fn, type Opt, type Reviver, type ValueOf } from '@/utils';
import { Code, newRequest, request, response, Route, type Request, type Status, UserInputRoute } from '@/api';
import type { ShowMessage } from '../messages';
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
	public static readonly SET_EXPIRED_CONTEXT: Readonly<React.Context<Fn>> = React.createContext<Fn>(doNothing);

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
		reviver?: Reviver,
	): OptBody<ResponseBody> {
		const RESULT = await (this as Client).request(showMessage, route, requestParams, checkSchema, reviver);
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
		reviver?: Reviver,
	): Promise<Opt<ResponseBody | UnauthenticatedError>> {
		try {
			const RESULT: Readonly<Response> = await fetch(`${this.address}${route}`, newRequest(requestParams));
			if (RESULT.status === 401) {
				return (this as Client).unauthenticated();
			}

			try {
				const JSON_ = await RESULT.text();
				const OBJECT = JSON.parse(JSON_, reviver);
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
	 * @param body the post request.
	 * @returns whether the request succeeded.
	 */
	public async create<RequestBodyInner, ResponseBody extends {}>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: UserInputRoute,
		body: request.Put<RequestBodyInner>,
		checkSchema: (json: unknown) => json is ResponseBody,
		reviver?: Reviver,
	): OptBody<Required<response.Put<ResponseBody>>['entity']> {
		const RESULT = await (this as Client).caughtRequest(showMessage, route, { method: 'PUT', body }, response.isPut, reviver);
		return (RESULT !== null && checkSchema(RESULT.entity))
			? RESULT.entity
			: null;
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
	public async export(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		body: request.Export,
	): OptBody<ValueOf<response.Export, 'exported'>> {
		const RESULT = await (this as Client).caughtRequest(showMessage, Route.Export, { method: 'POST', body }, response.isExport);
		return RESULT && RESULT.exported;
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
			{ method: 'POST', headers: { authorization: `Basic ${btoa(`${this.username}:${password}`)}` } },
			response.isDelete,
		) !== null;
	}

	/**
	 * Make a request on the {@link Route.Logout}.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @returns the response or an error.
	 */
	public async logout(this: Readonly<Client>, showMessage: ShowMessage): RequestSuccess {
		return await (this as Client).caughtRequest(showMessage, Route.Logout, { method: 'POST' }, response.isDelete) !== null;
	}

	/**
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param route the {@link Route} to send the request to.
	 * @param body the get request.
	 * @returns whether the request succeeded.
	 */
	public async retrieve<RequestBodyInner, ResponseBody>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: UserInputRoute,
		body: request.Post<RequestBodyInner>,
		checkSchema: (json: unknown) => json is ResponseBody,
	): OptBody<response.Post<ResponseBody>['entities']> {
		const RESULT = await (this as Client).caughtRequest(showMessage, route, { method: 'POST', body }, response.isPost);
		if (RESULT !== null) {
			const IS_EMPTY = RESULT.entities.length < 1;
			if (IS_EMPTY || (!IS_EMPTY && checkSchema(RESULT.entities[0]))) {
				return RESULT.entities as ResponseBody[];
			}
		}

		return null;
	}

	/**
	 * Update `this` {@link Client} based on information from a {@link Route.WhoAmI} request.
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @returns whether the request succeeded.
	 */
	public async setWhoIAm(this: Client, showMessage: ShowMessage,): RequestSuccess {
		const RESULT = await this.request(showMessage, Route.WhoAmI, { method: 'POST' }, response.isWhoAmI);
		if (RESULT === null) { return false; }

		if (!(RESULT instanceof UnauthenticatedError)) { // the user isn't logged in, which is fine.
			this.username = RESULT.username;
		}

		return true;
	}

	/**
	 * @param showMessage a function that will be used to notify a user of errors.
	 * @param route the {@link Route} to send the request to.
	 * @param body the patch request.
	 * @returns whether the request succeeded.
	 */
	public async update<RequestBodyInner>(
		this: Readonly<Client>,
		showMessage: ShowMessage,
		route: UserInputRoute,
		body: request.Patch<RequestBodyInner>,
	): RequestSuccess {
		return await (this as Client).caughtRequest(showMessage, route, { method: 'PATCH', body }, response.isPatch) !== null;
	}
}
