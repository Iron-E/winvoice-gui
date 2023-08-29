import { HOVER } from "./hover";

/** Standard padding used in the application. */
export const PAD = 'px-2 py-1' as const;

/** Standard spacing used in the application. */
export const SPACE = `mx-1 ${PAD} ${HOVER}` as const;
