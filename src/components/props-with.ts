import { type Fn } from '@/utils';

/** Properties of an {@link React.ReactElement | element} that include children a handler for the given `Event`. */
export type AsyncOn<Event extends string, Params extends any[] = [], Return = void> = On<Event, Params, Promise<Return>>;

/** Properties of an {@link React.ReactElement | element} that include class names. */
export type Class<Field extends string = ''> = Readonly<{
	/** The class name of this {@link React.ReactElement | element} */
	[F in Uncapitalize<Field> as F extends '' ? 'className' : `${F}ClassName`]?: string;
}>;

/** Properties of an {@link React.ReactElement | element} that include class names. */
export type Children<Field extends string = ''> = Readonly<{
	/** The elements inside this one. */
	[F in Uncapitalize<Field> as F extends '' ? 'children' : `${F}Children`]?: React.ReactNode;
}>;

/** Properties of an {@link React.ReactElement | element} that include click handlers. */
export type Click = On<'click', [event: React.MouseEvent]>;

/** Whether this particular element is disabled. */
export type ReadOnly = {
	readOnly?: boolean,
};

/** Properties of an {@link React.ReactElement | element} that include children. */
export type Id = Readonly<{
	/** An `#id` for the element . */
	id?: string,
}>;

/** Properties of an {@link React.ReactElement | element} that include children a handler for the given `Event`. */
export type On<Event extends string, Params extends any[] = [], Return = void> = Readonly<{
	[E in Capitalize<Event> as `on${E}`]?: Fn<Params, Return>;
}>;
