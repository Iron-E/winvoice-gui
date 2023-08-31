/** Equivalent to the {@link https://docs.rs/money2/latest/money2/enum.Currency.html | `Currency`} type. */
export enum Currency {
	Aud = 'AUD',
	Bgn = 'BGN',
	Brl = 'BRL',
	Cad = 'CAD',
	Chf = 'CHF',
	Cny = 'CNY',
	Czk = 'CZK',
	Dkk = 'DKK',
	Eur = 'EUR',
	Gbp = 'GBP',
	Hkd = 'HKD',
	Huf = 'HUF',
	Idr = 'IDR',
	Ils = 'ILS',
	Inr = 'INR',
	Isk = 'ISK',
	Jpy = 'JPY',
	Krw = 'KRW',
	Mxn = 'MXN',
	Myr = 'MYR',
	Nok = 'NOK',
	Nzd = 'NZD',
	Php = 'PHP',
	Pln = 'PLN',
	Ron = 'RON',
	Rub = 'RUB',
	Sek = 'SEK',
	Sgd = 'SGD',
	Thb = 'THB',
	Try = 'TRY',
	Usd = 'USD',
	Zar = 'ZAR',
}

/** The values of the Currency, */
const CURRENCY_VALUES: Readonly<Record<string, true>> = Object.values(Currency).reduce(
	(previous, current) => {
		previous[current] = true;
		return previous;
	},
	{} as Record<Currency, true>,
)

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Currency}.
 */
export function isCurrency(json: unknown): json is Currency {
	return typeof json === 'string' && CURRENCY_VALUES[json] != undefined;
}
