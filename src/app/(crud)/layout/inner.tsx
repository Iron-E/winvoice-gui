'use client';

import * as navigation from 'next/navigation';
import Link from 'next/link';
import { css, propsWith as w } from '../../../components';
import type { Props } from '../../../utils';

/** The properties accepted by {@link Link}. */
type LinkProps = Props<typeof Link>;

/** A link on the {@link CrudPage}. */
function CrudLink(props: w.Children & w.Class & { href: LinkProps['href'] }): React.ReactElement {
	return (
		<Link
			className={`${css.SPACE} border-[1px] \
bg-crud-page-button-bg border-crud-page-button-border hover:bg-crud-page-button-bg-hover`}
			href={props.href}
		>
			{props.children}
		</Link>
	);
}

/** @return the part of the `CrudLayout` that must be rendered on the client side. */
export function InnerCrudLayout(props: { newLinkChildren: React.ReactElement, searchLinkChildren: React.ReactElement }): React.ReactElement {
	const PATH_NAME = navigation.usePathname();
	return <>
		<CrudLink href={`${PATH_NAME}/new`}>
			{props.newLinkChildren}
		</CrudLink>

		<CrudLink href={PATH_NAME}>
			{props.searchLinkChildren}
		</CrudLink>
	</>;
}
