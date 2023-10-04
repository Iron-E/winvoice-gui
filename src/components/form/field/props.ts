import type { Id, On } from '../../props-with';
import type { Props, Spread } from '@/utils';
import { Input, Select } from '../../form';

type SpreadProps<Properties extends { label: any }, OnChangeValue = string> = Spread<
	Properties,
	Pick<Partial<Properties>, 'label'> & On<'change', [value: OnChangeValue]>
>;

type OmitProps<T> = Omit<
	Props<T>,
	| 'checked'
	| 'children'
	| 'inputClassName'
	| 'onChange'
	| 'pattern'
	| 'selectClassName'
	| 'type'
	| 'validateIconRight'
	| 'validateIconTop'
>

/** The properties used for composite fields. */
export type CompositeProps<T> = Required<Id & On<'change', [value: T]>> & { label: string, value?: T };

/** The properties used for a `<input>` element as part of the schema. */
export type InputProps<T> = SpreadProps<OmitProps<typeof Input>, T>;

/** The properties used for a `<select>` element as part of the schema. */
export type SelectProps<T> = SpreadProps<OmitProps<typeof Select>, T>;
