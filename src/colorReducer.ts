import { getType } from 'typesafe-actions';
import parse from 'parse-color';

import { parseAsClamped } from './color-check-util';
import { ColorToolAction } from './ColorToolContext';
import * as actions from './actions';
import { ColorToolContextProps } from './ColorToolContext';

export type ColorToolState = Pick<
  ColorToolContextProps,
  Exclude<keyof ColorToolContextProps, 'dispatch'>
>;

export function colorReducer(state: ColorToolState, action: ColorToolAction): ColorToolState {
  switch (action.type) {
    case getType(actions.updateHex): {
      const { payload } = action;
      // Valid and complete hex color code provided by the payload
      if (payload && /^#(\d|[a-f]){6}$/i.test(payload)) {
        let { rgba, hsla } = parse(payload);
        return {
          hex: payload,
          rgba,
          hsla,
        };
      }
      return {
        ...state,
        hex: payload,
      };
    }

    case getType(actions.updateMulti): {
      const { parser, value } = action.payload;
      let { hex, rgba, hsla, [parser]: color } = parseAsClamped(parser, value);

      if (color && !color.some(isNaN)) {
        return {
          hex,
          hsla,
          rgba,
          [parser]: color,
        };
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
