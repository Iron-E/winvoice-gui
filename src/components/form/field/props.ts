import type { On } from '../../props-with';
import type { Props, Spread } from '@/utils';
import { Input, Select } from '../../form';

type OmitProps<T> = Omit<Props<T>, 'checked' | 'inputClassName' | 'onChange' | 'pattern' | 'selectClassName' | 'type'>
type SpreadProps<Properties, OnChangeValue = string> = 'label' extends keyof Properties
	? Spread<
		Properties,
		Pick<Partial<Properties>, 'label'>
		& On<'change', [value: OnChangeValue]>
	>
	: never;

/** The properties used for a `<input>` element as part of the schema. */
export type InputProps<T> = SpreadProps<OmitProps<typeof Input>, T>;

/** The properties used for a `<select>` element as part of the schema. */
export type SelectProps<T> = SpreadProps<OmitProps<typeof Select>, T>;
