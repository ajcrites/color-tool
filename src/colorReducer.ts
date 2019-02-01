import parse from 'parse-color';
import { parseAsClamped } from './color-check-util';

export function colorReducer(state, { type, payload }) {
  switch (type) {
    case 'hex': {
      // Valid hex color code provided by the payload
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

    case 'rgba':
    case 'hsla': {
      let { hex, rgba, hsla, [type]: color } = parseAsClamped(type, payload)

      if (color && !color.some(isNaN)) {
        return {
          hex,
          hsla,
          rgba,
        };
      }
      return {
        ...state,
        [type]: payload,
      };
    }

    default:
      return state;
  }
}
