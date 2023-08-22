'use client';

import * as navigation from 'next/navigation';
import Link from 'next/link';
import type { Children, Class } from './props-with';
import type { Props } from '../utils';
import { ICON, FLEX, SPACE } from './css';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';

/** The properties accepted by {@link Link}. */
type LinkProps = Props<typeof Link>;

/** A link on the {@link CrudPage}. */
function CrudLink(props: Children & Class & { href: LinkProps['href'] }): React.ReactElement {
	const PATH_NAME = navigation.usePathname();
	return (
		<Link
			className={`${SPACE} border-[1px] bg-crud-page-button-bg border-crud-page-button-border hover:bg-crud-page-button-bg-hover text-center whitespace-nowrap`}
			href={`${PATH_NAME}/${props.href}`}
		>
			{props.children}
		</Link>
	);
}

export function CrudPage(props: Children): React.ReactElement {
	return <>
		<div className={`${FLEX} justify-center`}>
			<CrudLink href="create">
				<PlusIcon className={ICON} /> New
			</CrudLink>

			<CrudLink href="retrieve">
				<MagnifyingGlassIcon className={ICON} /> Search
			</CrudLink>
		</div>

		<main>
			{props.children}
		</main>
	</>;
}
