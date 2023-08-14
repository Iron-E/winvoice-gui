'use client';

import React from 'react';
import { ClassName, Click } from './props-with';
import { ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { FLEX } from './css/flex';
import { XButton } from './x-button';

/**
 * The severity of a message which  may be shown to the user.
 *
 * `'DEBUG'` and `'TRACE'` should be done via {@link console.debug} and {@link console.log} respectively.
 */
type Level = 'ERROR' | 'INFO' | 'WARN';

/** A message which may be shown to the user. */
export type Message = {
	/** the unique identifier of the message */
	key: string,
	/** the severity of the message */
	level: Level,
	/** the content of the message */
	text: string,
};

/** A function that can be used to add {@link Message}s to the {@link Messages} element. */
type ShowMessage = (level: Level, text: string) => void;

/** The context used to provide a message creator. */
export const SHOW_MESSAGE_CONTEXT = React.createContext<ShowMessage>(() => { });

/** The icon style which is shared by all icons. */
const BASE_ICON_STYLE = 'flex-shrink-0 w-5' as const;

/** The style used for the {@link XButton}. */
const BASE_LEVEL_ICON_STYLE = `${BASE_ICON_STYLE} ml-1` as const;

/** The base style of a {@link Message}, which is shared by all levels. */
const BASE_MSG_STYLE = `${FLEX} gap-1 justify-between basis-auto hover:flex-shrink-0 m-1 px-1 py-1 min-w-[10vmax] max-w-fit ease-in-out duration-300 rounded z-1` as const;

/** Arbitrary data ssociated with the {@link Level} of a message. */
const DATA_BY_LEVEL = {
	ERROR: {
		icon: <XCircleIcon className={BASE_LEVEL_ICON_STYLE} />,
		severity: 2,
		style: `${BASE_MSG_STYLE} flex-shrink bg-rose-500`,
	},

	INFO: {
		icon: <InformationCircleIcon className={BASE_LEVEL_ICON_STYLE} />,
		severity: 0,
		style: `${BASE_MSG_STYLE} [flex-shrink:3] bg-sky-300`,
	},

	WARN: {
		icon: <ExclamationTriangleIcon className={BASE_LEVEL_ICON_STYLE} />,
		severity: 1,
		style: `${BASE_MSG_STYLE} [flex-shrink:2] bg-orange-400`,
	},
} as const;

/**
 * Sort a {@link Array | list} of messages such that the more critical messages are shown first.
 * @see {@link Array.sort}
 */
export function compareByLevel(a: Message, b: Message): -1 | 0 | 1 {
	const A_SEVERITY = DATA_BY_LEVEL[a.level].severity;
	const B_SEVERITY = DATA_BY_LEVEL[b.level].severity;

	if (A_SEVERITY > B_SEVERITY) {
		return -1;
	} else if (A_SEVERITY < B_SEVERITY) {
		return 1;
	}

	return 0;
}

/** @return a {@link Message} as a */
function Message_(props: Click<Message, 'onHide'>): React.ReactElement {
	const DATA = DATA_BY_LEVEL[props.level];
	return (
		<div className={DATA.style} key={props.key}>
			<XButton className={BASE_ICON_STYLE} onClick={props.onHide} />

			<span className='flex-shrink overflow-hidden overflow-ellipsis whitespace-nowrap'>
				{props.text}
			</span>

			{DATA.icon}
		</div>
	);
}

/** @return an {@link React.ReactElement | element} which floats messages at the bottom of the screen, and a function to show new messages. */
export function Messages(props: ClassName<{ messages: Message[], onHideMessage: (key: string) => void }>): React.ReactElement {
	return (
		<div className={props.className}>
			{props.messages.map(message => Message_({ ...message, onHide: () => props.onHideMessage(message.key) }))}
		</div>
	);
}
