import type { CompositeProps } from './props';
import type { Id } from '@/schema';
import { BorderLabelField } from './border-label';
import { DeleteIcon, NewIcon } from '../../icons';
import { Fn, Opt, Props } from '@/utils';
import { FormButton, LABEL_BUTTON_STYLE } from '../../form';
import { InputId } from '../field';
import { HOVER } from '@/components/css';

type IdsProps<T> = CompositeProps<Opt<T>[]>;
type ActionHandler = NonNullable<Props<typeof InputId>['onAction']>;

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputIds<T extends { id: Id }>(props:
	& Omit<IdsProps<T>, 'value'>
	& {
		onAction: Fn<[index: number, ...rest: Parameters<ActionHandler>], ReturnType<ActionHandler>>,
		values: NonNullable<IdsProps<T>['value']>,
	}
): React.ReactElement {
	return (
		<BorderLabelField className='pt-3 w-full' label={props.label}>
			<FormButton
				className={`${HOVER} px-1 absolute top-[-1.2rem] right-2`}
				onClick={() => props.onChange([...props.values, null])}
			>
				<NewIcon />
			</FormButton>

			{props.values.map((d, i) => (
				<div>
					<InputId
						id={`${props.id}-${i + 1}`}
						label={`${i + 1}.`}
						onAction={action => props.onAction(i, action)}
						required={true}
						title='A department assigned to this Job'
						validateIconRight='right-4'
						validateIconTop='top-[-0.05rem]'
						value={d?.id ?? ''}
					>
						<FormButton
							className={LABEL_BUTTON_STYLE}
							onClick={() => props.onChange(props.values.filter((_, j) => j !== i))}
						>
							<DeleteIcon />
						</FormButton>
					</InputId>
				</div>
			))}

		</BorderLabelField>
	);
}
