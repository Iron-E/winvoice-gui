import { type Func } from '../utils';

/** Properties of an {@link React.ReactElement | element} that include class names. */
export type ClassName<T extends {} = {}, Field extends string = 'className'> = T & {
	/** The class name of this {@link React.ReactElement | element} */
	[F in Field]?: string;
};

/** Properties of an {@link React.ReactElement | element} that include click handlers. */
export type Click = ;

/** Properties of an {@link React.ReactElement | element} that include children. */
export type Children<T extends {} = {}> = T & {
	/** The elements inside this one. */
	children?: React.ReactNode,
};

export type Handler<Name extends string, T extends {} = {}> = T & {
	[N in Name as `on${N}`]: string;
};

/** Properties of an {@link React.ReactElement | element} that include children. */
export type Key<T extends {} = {}> = T & {
	/** A unique identifier for the element. */
	key?: React.Key,
};
