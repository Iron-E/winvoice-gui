import React from 'react';
import type { AsyncOn, Class, On } from "@/components/props-with";
import type { Maybe, Props } from "@/utils";
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, WifiIcon } from '@heroicons/react/20/solid';
import { Client } from '../client';
import { Form, FormButton, Input, InputPassword, InputString, Modal, SHOW_MESSAGE_CONTEXT } from "@/components";
import { ICON, SPACE } from '@/components/css';
import { useModalVisibility } from '@/hooks';

type ModalProps = Props<typeof Modal>;

/** Properties which accept a handler. */
type SelectorProps = Required<On<'setClient', [client: Client]>> & { client?: Readonly<Client> };

/** Properties used by {@link Modal}s in the {@link ClientSelector}. */
type SelectorModalProps = Omit<ModalProps, 'children'> & SelectorProps;

/** @returns A floating form. */
function ModalForm(props: Pick<ModalProps, 'children' | 'onClose'> & Required<AsyncOn<'submit'> & { button_text: string }>) {
	return (
		<Modal onClose={props.onClose}>
			<Form onSubmit={props.onSubmit}>
				{props.children}

				<FormButton className={SPACE}>
					{props.button_text}
				</FormButton>
			</Form>
		</Modal>
	);
}

/** @returns the {@link Modal} to use when connecting to the {@link State | API}. */
function ConnectModal(props: SelectorModalProps): React.ReactElement {
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [URL, setUrl] = React.useState<string>(props.client?.address || '');

	return (
		<ModalForm
			button_text='Connect'
			onClose={props.onClose}
			onSubmit={async () => {
				const CLIENT: Client = new Client(URL);
				if (!await CLIENT.setWhoIAm(showMessage)) { return; }
				props.onSetClient(CLIENT);
				props.onClose(null);
			}}
		>
			<Input
				id='client-connect-addr'
				label='Address'
				onChange={setUrl}
				placeholder='https://domain:3000'
				required={true}
				title="The winvoice-server's address"
				type='url'
				value={URL}
			/>
		</ModalForm>
	);
}

/** @returns the {@link Modal} to use when logging in to the {@link State | API}. */
function LoginModal(props: SelectorModalProps): React.ReactElement {
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [USERNAME, setUsername] = React.useState<string>(props.client?.user?.username ?? '');
	const [PASSWORD, setPassword] = React.useState<string>('');

	return (
		<ModalForm button_text='Login' onClose={props.onClose} onSubmit={async () => {
			const CLIENT = new Client(props.client!.address, {
				username: USERNAME,
				id: '',
				password: '',
				password_set: new Date(),
				role: {
					id: '',
					name: '',
				},
			});
			if (!await CLIENT.login(showMessage, PASSWORD)) { return; }
			props.onSetClient(CLIENT);
			props.onClose(null);
		}}>
			<InputString
				id='client-login--username'
				label='Username'
				onChange={setUsername}
				placeholder=''
				required={true}
				title='Your username'
				value={USERNAME}
			/>

			<InputPassword
				id='client-login--password'
				onChange={setPassword}
				placeholder=''
				required={true}
				title='Your password'
				value={PASSWORD}
			/>
		</ModalForm>
	);
}

/** @returns an API {@link State} selector. */
export function ClientSelector(props: Class<'button'> & SelectorProps): React.ReactElement {
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [MODAL_VISIBLE, setModalVisible] = useModalVisibility<'connect' | 'login'>();

	const CLIENT = props.client;
	let account_button: Maybe<React.ReactElement>;

	if (CLIENT != undefined) {
		props.client
		let [Icon, content, onClick] = CLIENT.user == undefined
			? [ArrowRightOnRectangleIcon, 'Login', () => setModalVisible('login')]
			: [ArrowLeftOnRectangleIcon, 'Logout', async () => {
				if (!await CLIENT.logout(showMessage)) { return; }
				props.onSetClient(new Client(CLIENT.address));
			}]
			;

		account_button = (
			<button className={props.buttonClassName} onClick={onClick}>
				<Icon className={ICON} /> {content}
			</button>
		);
	}

	const MODAL = (MODAL_VISIBLE == 'connect' && ConnectModal) || (MODAL_VISIBLE == 'login' && LoginModal);
	return <>
		{account_button}
		<button className={props.buttonClassName} onClick={() => setModalVisible('connect')}>
			<WifiIcon className={ICON} /> Connect
		</button>

		{MODAL && <MODAL client={props.client} onClose={setModalVisible} onSetClient={props.onSetClient} />}
	</>;
}
