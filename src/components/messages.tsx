'use client';

import React from 'react';
import type { ClassName, On } from './props-with';
import { ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { FLEX } from './css/flex';
import { XButton } from './x-button';

/** The icon style which is shared by all icons. */
const BASE_ICON_STYLE = 'flex-shrink-0 w-5' as const;

/** The style used for the {@link XButton}. */
const BASE_LEVEL_ICON_STYLE = `${BASE_ICON_STYLE} ml-1` as const;

/** The base style of a {@link Message}, which is shared by all levels. */
const BASE_MSG_STYLE = `${FLEX} gap-1 justify-between basis-auto hover:flex-shrink-0 m-1 px-1 py-1 min-w-[10vmax] max-w-fit ease-in-out duration-300 rounded z-1` as const;

/** Arbitrary data ssociated with the {@link Level} of a message. */
const LEVELS = {
	error: {
		icon: <XCircleIcon className={BASE_LEVEL_ICON_STYLE} />,
		severity: 10,
		style: `${BASE_MSG_STYLE} flex-shrink bg-rose-500`,
	},

	info: {
		icon: <InformationCircleIcon className={BASE_LEVEL_ICON_STYLE} />,
		severity: 1,
		style: `${BASE_MSG_STYLE} [flex-shrink:3] bg-sky-300`,
	},

	warn: {
		icon: <ExclamationTriangleIcon className={BASE_LEVEL_ICON_STYLE} />,
		severity: 5,
		style: `${BASE_MSG_STYLE} [flex-shrink:2] bg-orange-400`,
	},
} as const;

/**
 * The severity of a message which  may be shown to the user.
 *
 * `'DEBUG'` and `'TRACE'` should be done via {@link console.debug} and {@link console.log} respectively.
 */
type Level = keyof typeof LEVELS;

/** A message which may be shown to the user. */
export type Message = {
	/** the unique identifier of the message */
	key: string,
	/** the severity of the message */
	level: Level,
	/** the content of the message */
	text: string,
};

/** The context used to provide a message creator. */
export const SHOW_MESSAGE_CONTEXT = React.createContext<(level: Level, text: string) => void>(() => { });

/**
 * Sort a {@link Array | list} of messages such that the more critical messages are shown first.
 * @see {@link Array.sort}
 */
export function compareByLevel(a: Message, b: Message): number {
	return LEVELS[b.level].severity - LEVELS[a.level].severity;
}

/** @return a {@link Message} as a */
function Message_(props: Message & On<'hide'>): React.ReactElement {
	const DATA = LEVELS[props.level];
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
export function Messages(props: ClassName & Required<On<'hideMessage', [key: string]>> & { messages: Message[] }): React.ReactElement {
	return (
		<div className={props.className}>
			{props.messages.map(message => Message_({ ...message, onHide: () => props.onHideMessage(message.key) }))}
		</div>
	);
}
