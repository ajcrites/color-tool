/**
 * Context for managing state of the color tool app
 */

import { createContext, Dispatch } from 'react';
import { ActionType } from 'typesafe-actions';

import * as actions from '~/color/actions';

export type ColorToolAction = ActionType<typeof actions>;

export interface ColorToolContextProps {
  // Hex representation (#abcdef)
  hex: string;

  // RGBA representation [0-255, 0-255, 0-255, 0-1]
  rgba: number[] | string[];

  // HSLA representation [0-359, 0-100, 0-100, 0-1]
  hsla: number[] | string[];

  // Keyword representation
  keyword: string;

  // Whether a keyword has a corresponding color
  hasKeyword: boolean;

  dispatch: Dispatch<ColorToolAction>;
}

export const ColorToolContext = createContext<ColorToolContextProps>({} as any);
