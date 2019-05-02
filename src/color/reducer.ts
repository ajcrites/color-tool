/**
 * reducer for updating color values based on updates to a particular
 * color type. Color types (hex, hsla, rgba, keyword) are updated, and
 * corresponding valid updates are propagated to the other color types
 */

import parse, { Color } from 'parse-color';
import { getType } from 'typesafe-actions';
import {
  isValidKeyword,
  isValidNumber,
  parseAsClamped,
} from '~/color-check-util';
import { ColorToolAction, ColorToolContextProps } from '~/ColorToolContext';

import * as actions from './actions';

export type ColorToolState = Pick<
  ColorToolContextProps,
  Exclude<keyof ColorToolContextProps, 'dispatch'>
>;

export const createStateFromParsedColor = ({
  hex,
  hsla,
  rgba,
  keyword,
}: Partial<ColorToolState>): ColorToolState => ({
  hex,
  hsla,
  rgba,
  keyword: keyword ? keyword : '',
  hasKeyword: !!keyword,
});

/**
 * When updating hex or keyword, the parsed color hsla/rgba always have an
 * alpha of 1. We want to use the updated color value but retain the existing
 * alpha value that may have been modified (if it exists).
 */
export const retainAlphas = (
  oldColor: ColorToolState,
  newColor: Color,
): Partial<ColorToolState> => {
  return {
    ...newColor,
    hsla: [
      ...newColor.hsla.slice(0, 3),
      (oldColor.hsla && oldColor.hsla[3]) || 1,
    ],
    rgba: [
      ...newColor.rgba.slice(0, 3),
      (oldColor.rgba && oldColor.rgba[3]) || 1,
    ],
  };
};

export function colorReducer(
  state: ColorToolState,
  action: ColorToolAction,
): ColorToolState {
  switch (action.type) {
    case getType(actions.updateHex): {
      const { payload } = action;
      let nextState = {};
      // Valid and complete hex color code provided by the payload
      if (payload && /^#[a-f0-9]{6}$/i.test(payload)) {
        nextState = createStateFromParsedColor(
          retainAlphas(state, parse(payload)),
        );
      }

      return {
        ...state,
        ...nextState,
        hex: payload,
      };
    }

    case getType(actions.updateKeyword): {
      const { payload } = action;
      const { hex, keyword, ...parsed } = parse(payload);
      let nextState: Partial<ColorToolState> = { hasKeyword: false };
      // keyword comes back no matter what, so we check hex as well to make sure
      // a valid color was provided
      if (hex && keyword && isValidKeyword(keyword)) {
        nextState = createStateFromParsedColor(
          retainAlphas(state, { ...parsed, keyword, hex }),
        );
      }

      return {
        ...state,
        ...nextState,
        keyword: payload,
      };
    }

    case getType(actions.updateMulti): {
      const { parser, value } = action.payload;
      let nextState: Partial<ColorToolState> = { [parser]: value };
      if (value.every(isValidNumber)) {
        nextState = createStateFromParsedColor(parseAsClamped(parser, value));
      }

      return {
        ...state,
        ...nextState,
      };
    }

    default:
      return state;
  }
}
