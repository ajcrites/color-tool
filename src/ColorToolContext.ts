import { createContext } from 'react';

export interface ColorToolContextProps {
  hex: string;
  rgba: number[];
  hsla: number[];

  setHex: (value) => void;
  setRgba: (value) => void;
  setHsla: (value) => void;
}

export const ColorToolContext = createContext<ColorToolContextProps>(
  {} as any,
);
