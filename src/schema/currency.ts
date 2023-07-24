/**
 * Equivalent to the {@link https://docs.rs/money2/latest/money2/enum.Currency.html | `Currency`} type.
 */
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

export namespace Currency {
	/**
	 * @returns The default {@link Currency}.
	 */
	export function default_(): Currency {
		return Currency.Eur;
	}
}
