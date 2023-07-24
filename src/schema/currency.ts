/**
 * Equivalent to the {@link https://docs.rs/money2/latest/money2/enum.Currency.html | `Currency`} type.
 */
export enum Currency {
	Aud,
	Bgn,
	Brl,
	Cad,
	Chf,
	Cny,
	Czk,
	Dkk,
	Eur,
	Gbp,
	Hkd,
	Huf,
	Idr,
	Ils,
	Inr,
	Isk,
	Jpy,
	Krw,
	Mxn,
	Myr,
	Nok,
	Nzd,
	Php,
	Pln,
	Ron,
	Rub,
	Sek,
	Sgd,
	Thb,
	Try,
	Usd,
	Zar,
}

export namespace Currency {
	/**
	 * @returns The default {@link Currency}.
	 */
	export function default_(): Currency {
		return Currency.Eur;
	}
}
