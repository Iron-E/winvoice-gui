'use client';

import React from 'react';
import type { Children, Click } from './props-with';
import { FLEX } from './css';

/** The properties of a {@link Dim}. */
export type Props = Children & Click;

/** How high up the current {@link Dim} is. */
const Z_INDEX_CONTEXT: Readonly<React.Context<number>> = React.createContext(0);

/** @return a floating `div` which dims the screen at `z-0`. */
export function Dim(props: Props): React.ReactElement {
	const REF = React.useRef<HTMLDivElement>(null);
	const Z_INDEX = React.useContext(Z_INDEX_CONTEXT);
	React.useEffect(() => {
		const OUTER_DIM = REF.current?.parentElement?.closest<HTMLDivElement>('.DIM');
		if (OUTER_DIM == undefined) {
			return;
		}

		OUTER_DIM.style.setProperty('--tw-bg-opacity', '0');
		return () => OUTER_DIM.style.setProperty('--tw-bg-opacity', '0.7');
	}, [])

	return (
		<div
			className={`${FLEX} justify-center fixed top-0 left-0 w-screen h-screen bg-dim-bg bg-opacity-70 DIM`}
			onClick={props.onClick}
			ref={REF}
			style={{ zIndex: Z_INDEX }}
		>
			<Z_INDEX_CONTEXT.Provider value={Z_INDEX + 1}>
				{props.children}
			</Z_INDEX_CONTEXT.Provider>
		</div>
	);
}
