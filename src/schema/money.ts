import { Currency } from "./currency";

/**
 * Same as {https://github.com/Iron-E/winvoice-schema | `Money`} type.
 */
export type Money = {
	amount: string,
	currency: Currency,
};
