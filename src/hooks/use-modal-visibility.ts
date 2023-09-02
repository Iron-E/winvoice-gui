import React from 'react';
import { Opt } from '@/utils';

/**
 * @param <States> the different modals which may be shown, e.g. `'Connect' | 'Login'`.
 * @return see {@link React.useState}.
 */
export function useModalVisibility<States>(): [Opt<States>, React.Dispatch<React.SetStateAction<Opt<States>>>] {
	return React.useState<Opt<States>>(null);
}
