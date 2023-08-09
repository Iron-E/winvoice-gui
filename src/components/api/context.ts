'use client';

import React from 'react';
import { type Maybe } from '../../utils';
import { State } from './state';

/** The context for the currently selected API address. */
export const CONTEXT = React.createContext<Maybe<State>>(undefined);
