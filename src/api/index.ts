export * as request from './request';
export * as response from './response';
export { Route } from './route';
export { Code, type Status } from './status';

/** The request header used to indicate the expected API version on the {@link https://github.com/Iron-E/winvoice-sevrer | winvoice-server}. */
export const VERSION_HEADER = { 'Api-Version': '^0.1' } as const;
