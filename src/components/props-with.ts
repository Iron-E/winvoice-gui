/** Properties of an {@link React.ReactElement | element} that include class names. */
export type ClassName<T extends {} = {}, Field extends string = 'className'> = T & {
	/** The class name of this {@link React.ReactElement | element} */
	[F in Field]?: string;
};

/** Properties of an {@link React.ReactElement | element} that include click handlers. */
export type Click<T extends {} = {}, Field extends string = 'onClick'> = T & {
	/** What to do when clicking this {@link React.ReactElement | element}. */
	[F in Field]?: () => void;
};

/** Properties of an {@link React.ReactElement | element} that include children. */
export type Children<T extends {} = {}> = T & {
	/** The elements inside this one. */
	children?: React.ReactNode,
};
