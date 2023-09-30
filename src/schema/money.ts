import { Currency, isCurrency } from './currency';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Money`} type. */
export type Money = {
	amount: string,
	currency: Currency,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Money}.
 */
export function isMoney(json: unknown): json is Money {
	return json instanceof Object && (
		'amount' in json && typeof json.amount === 'string'
		&& 'currency' in json && isCurrency(json.currency)
	);
}

/**
 * @param money the {@link Money} to convert to a string.
 * @returns the `money` as a `string`.
 */
export function moneyToString(money: Money): string {
	return `${money.amount} ${money.currency}`;
}
