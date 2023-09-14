import React from 'react';
import { Client, ClientSelector } from './client';
import { SHOW_MESSAGE_CONTEXT, type ShowMessage } from '../messages';

export { Client, ClientSelector };
export { UnauthenticatedError } from './unauthenticated_error';
export { UnexpectedResponseError } from './unexpected_response_error';

/** @return the {@link Client.CONTEXT}, and {@link SHOW_MESSAGE_CONTEXT} which is necessary to use the former.. */
export function useApiContext(): [Readonly<Client>, ShowMessage] {
	return [React.useContext(Client.CONTEXT), React.useContext(SHOW_MESSAGE_CONTEXT)];
}
