'use client';

import React from 'react';
import type { Class, On } from './props-with';
import { ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { FLEX_BETWEEN, SPACE } from './css';

/** The icon style which is shared by all icons. */
const BASE_ICON_STYLE = 'flex-shrink-0 w-5' as const;

/** The base style of a {@link Message}, which is shared by all levels. */
const BASE_MSG_STYLE = `${FLEX_BETWEEN} gap-1 basis-auto hover:flex-shrink-0 \
${SPACE} min-w-[7vmax] max-w-fit \
ease-in-out duration-200 \
[&:not(:first-child):not(:hover)]:opacity-60 \
z-50` as const;

/** Arbitrary data ssociated with the {@link Level} of a message. */
const LEVELS = {
	error: {
		icon: <XCircleIcon className={BASE_ICON_STYLE} />,
		severity: 10,
		style: `${BASE_MSG_STYLE} flex-shrink text-black bg-message-bg-error`,
	},

	info: {
		icon: <InformationCircleIcon className={BASE_ICON_STYLE} />,
		severity: 1,
		style: `${BASE_MSG_STYLE} [flex-shrink:3] bg-message-bg-info`,
	},

	warn: {
		icon: <ExclamationTriangleIcon className={BASE_ICON_STYLE} />,
		severity: 5,
		style: `${BASE_MSG_STYLE} [flex-shrink:2] bg-message-bg-warn`,
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

/** The function which is used to show additional messages on the screen. */
export type ShowMessage = (level: Level, text: string) => void;

/** The context used to provide a message creator. */
export const SHOW_MESSAGE_CONTEXT: Readonly<React.Context<ShowMessage>> = React.createContext<ShowMessage>(() => { });

/** @returns a {@link Message} as a */
function Message_(props: Omit<Readonly<Message>, 'key'> & Required<On<'hide'>>): React.ReactElement {
	const DATA = LEVELS[props.level];
	return (
		<div className={DATA.style}>
			<button onClick={props.onHide}>
				{DATA.icon}
			</button>

			<span className='flex-shrink overflow-hidden overflow-ellipsis whitespace-nowrap'>
				{props.text}
			</span>
		</div>
	);
}

/** @returns an {@link React.ReactElement | element} which floats messages at the bottom of the screen, and a function to show new messages. */
export function Messages(props: Class & Required<On<'hideMessage', [key: string]>> & Readonly<{ messages: Message[] }>): React.ReactElement {
	return (
		<div className={props.className}>
			{props.messages.map(message => <Message_
				key={message.key}
				level={message.level}
				onHide={() => props.onHideMessage(message.key)}
				text={message.text}
			/>)}
		</div>
	);
}
