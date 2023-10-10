/**
 * A function that, when called, does nothing.
 *
 * @remarks
 * next.js complains that some components cannot be written to when `readOnly` is not set. However, setting `readOnly`
 * disables the posibility of adding `required`, and linking with foreign keys *is* often `required`. This empty
 * function shuts next.js up
 */
export function doNothing(): void {}
