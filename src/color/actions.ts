import { createStandardAction, createAction } from 'typesafe-actions';

export const updateHex = createStandardAction('UPDATE_HEX')<string>();
export const updateKeyword = createStandardAction('UPDATE_KEYWORD')<string>();
export const updateMulti = createAction(
  'UPDATE_MULTI',
  resolve => (parser, value) => resolve({ parser, value }),
);
