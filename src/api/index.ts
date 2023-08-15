export type * as request from './request';
export type * as response from './response';
export { Code, type Status } from './status';
export { Route } from './route';

/** The request header used to indicate the expected API version on the {@link https://github.com/Iron-E/winvoice-sevrer | winvoice-server}. */
export const VERSION_HEADER = { 'api-version': '^0.1' } as const;
