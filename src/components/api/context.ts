import React from 'react';
import { State } from './state';

/** The context for the currently selected API address. */
export const CONTEXT = React.createContext<State | undefined>(undefined);
