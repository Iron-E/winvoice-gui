/** Retrieve the fields which will be serialized by {@link JSON.stringify}. */
export type JsonFields<T extends {}> = {
	[F in keyof T]: T[F] extends Function ? never : T[F];
};
