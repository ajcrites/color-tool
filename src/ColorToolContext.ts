import { createContext, Dispatch } from 'react';

export interface ColorToolContextProps {
  hex: string;
  rgba: number[];
  hsla: number[];

  dispatch: Dispatch<{ type, payload }>;
}

export const ColorToolContext = createContext<ColorToolContextProps>(
  {} as any,
);
