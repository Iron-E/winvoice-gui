/** Properties of an {@link React.ReactElement | element} that include class names. */
export type ClassName<T = {}> = T & {
	/** The class name of this {@link React.ReactElement | element} */
	className?: string,
};

/** Properties of an {@link React.ReactElement | element} that include click handlers. */
export type Click<T = {}> = T & {
	/** What to do when clicking this {@link React.ReactElement | element}. */
	onClick?: () => void,
};
