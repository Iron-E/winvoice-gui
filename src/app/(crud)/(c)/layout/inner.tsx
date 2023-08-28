'use client';

import * as navigation from 'next/navigation';

const SUFFIX = '/new'.length;

/** @return a part of the `CreateLayout` which must be rendered on the client-side. */
export function InnerCreateLayout(): React.ReactElement {
	const URL = navigation.usePathname();
	const ROUTE = URL.substring(1, URL.length - SUFFIX);
	return (
		<h2 className='font-semibold text-xl mb-3'>
			Create {ROUTE[0]?.toUpperCase() + ROUTE.substring(1)}
		</h2>
	);
}
