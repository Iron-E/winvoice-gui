/** CSS properties to used as part of flexing a container, without the `flex` attribute itself. */
export const FLEX_ATTRS = 'align-middle items-center' as const;

/** CSS properties to flex a container */
export const FLEX = `flex ${FLEX_ATTRS}` as const;

/** CSS properties to make a container invisible until it is `xl`, then flex it. */
export const HIDDEN_XL_FLEX = `hidden xl:flex ${FLEX_ATTRS}`;
