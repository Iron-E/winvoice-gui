/** Retrieve the fields which will be serialized by {@link JSON.stringify}. */
export type JsonFields<T extends {}> = {
	[K in keyof T as T[K] extends Function ? never : K]: T[K];
};
