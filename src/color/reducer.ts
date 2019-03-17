import { getType } from 'typesafe-actions';
import parse from 'parse-color';

import { isValidNumber, parseAsClamped } from '~/color-check-util';
import { ColorToolAction, ColorToolContextProps } from '~/ColorToolContext';
import * as actions from './actions';

export type ColorToolState = Pick<
  ColorToolContextProps,
  Exclude<keyof ColorToolContextProps, 'dispatch'>
>;

// tslint:disable-next-line:cognitive-complexity
export function colorReducer(
  state: ColorToolState,
  action: ColorToolAction,
): ColorToolState {
  switch (action.type) {
    case getType(actions.updateHex): {
      const { payload } = action;
      // Valid and complete hex color code provided by the payload
      if (payload && /^#(\d|[a-f]){6}$/i.test(payload)) {
        const { rgba, hsla, keyword } = parse(payload);
        return {
          rgba,
          hsla,
          keyword: keyword ? keyword : '',
          hex: payload,
        };
      }
      return {
        ...state,
        hex: payload,
      };
    }

    case getType(actions.updateKeyword): {
      const { payload } = action;
      const { rgba, hsla, hex, keyword } = parse(payload);
      // keyword comes back no matter what, so we check hex as well to make sure
      // a valid color was provided
      if (hex && keyword && /[\w-]+/.test(keyword)) {
        return {
          rgba,
          hsla,
          hex,
          keyword: payload,
        };
      }

      return {
        ...state,
        keyword: payload,
      };
    }

    case getType(actions.updateMulti): {
      const { parser, value } = action.payload;
      if (value.every(isValidNumber)) {
        const { hex, rgba, hsla, keyword, [parser]: color } = parseAsClamped(
          parser,
          value,
        );

        if (color && !color.some(isNaN)) {
          return {
            hex,
            hsla,
            rgba,
            keyword: keyword ? keyword : '',
            [parser]: color,
          };
        }
      }
      return {
        ...state,
        [parser]: value,
      };
    }

    default:
      return state;
  }
}
