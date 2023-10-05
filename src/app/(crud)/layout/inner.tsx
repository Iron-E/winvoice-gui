'use client';

import * as navigation from 'next/navigation';

const SUFFIX = '/new';
const SUFFIX_LEN = SUFFIX.length;

/** @returns a part of the `CreateLayout` which must be rendered on the client-side. */
export function InnerCrudLayout(): React.ReactElement {
	const URL = navigation.usePathname();
	const IS_NEW_PAGE = URL.endsWith(SUFFIX);
	const ROUTE = URL.substring(1, IS_NEW_PAGE ? URL.length - SUFFIX_LEN : URL.length);
	const ENTITY = ROUTE[0]?.toUpperCase() + ROUTE.substring(1);
	return (
		<h2 className='font-semibold text-xl'>
			{IS_NEW_PAGE ? `Create New ${ENTITY}` : `Search for ${ENTITY}s`}
		</h2>
	);
}
