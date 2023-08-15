import { type Func } from '../utils';

/** Properties of an {@link React.ReactElement | element} that include class names. */
export type ClassName<Field extends string = 'className'> = {
	/** The class name of this {@link React.ReactElement | element} */
	[F in Field]?: string;
};

/** Properties of an {@link React.ReactElement | element} that include children. */
export type Children = {
	/** The elements inside this one. */
	children?: React.ReactNode,
};

/** Properties of an {@link React.ReactElement | element} that include click handlers. */
export type Click = On<'click', [event: React.MouseEvent]>;

/** Properties of an {@link React.ReactElement | element} that include children a handler for the given `Event`. */
export type On<Event extends string, Params extends any[] = [], Return = void> = {
	[E in Capitalize<Event> as `on${E}`]?: Func<Params, Return>;
};

/** Properties of an {@link React.ReactElement | element} that include children. */
export type Key = {
	/** A unique identifier for the element. */
	key?: React.Key,
};
