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
}: Color): ColorToolState => ({
  hex,
  hsla,
  rgba,
  keyword: keyword ? keyword : '',
  hasKeyword: !!keyword,
});

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
        nextState = createStateFromParsedColor(parse(payload));
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
        nextState = createStateFromParsedColor({ ...parsed, keyword, hex });
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
