export * as request from './request';
export * as response from './response';
export * as routes from './routes';
export { Code, type Status } from './status';

/** Information about the API version supported by this client. */
export const VERSION = {
	/** The request header used to indicate the expected API version on the {@link https://github.com/Iron-E/winvoice-sevrer | winvoice-server}. */
	header: 'Api-Version',

	/** The version range which is currently accepted by the client. */
	range: '^0.1',
};
