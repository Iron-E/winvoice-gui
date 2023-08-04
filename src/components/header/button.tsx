/** A button for the {@link Header}. */
export function Button(props: React.PropsWithChildren<{onClick?: React.MouseEventHandler<HTMLButtonElement>}>): React.ReactNode {
	return (
		<button className='bg-gray-300 rounded px-1 py-1 mr-1' onClick={props.onClick}>
			Connect
		</button>
	);
}
