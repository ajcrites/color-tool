import { createContext, Dispatch } from 'react';
import { ActionType } from 'typesafe-actions';

import * as actions from '~/color/actions';

export type ColorToolAction = ActionType<typeof actions>;

export interface ColorToolContextProps {
  hex: string;
  rgba: number[] | string[];
  hsla: number[] | string[];

  dispatch: Dispatch<ColorToolAction>;
}

export const ColorToolContext = createContext<ColorToolContextProps>({} as any);
