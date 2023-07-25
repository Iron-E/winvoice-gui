/**
 * Same as {@link https://doc.rust-lang.org/core/time/struct.Duration.html | `Duration`} type.
 */
export type Duration = { [key in 'nanos' | 'secs']: number };
