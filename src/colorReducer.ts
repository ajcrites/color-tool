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

    case 'rgba': {
      let { hex, rgba, hsla } = parseAsClamped('rgba', payload)

      if (rgba && !rgba.some(isNaN)) {
        return {
          hex,
          hsla,
          rgba: payload,
        };
      }
      return {
        ...state,
        rgba: payload,
      };
    }

    case 'hsla': {
      let { hex, rgba, hsla } = parseAsClamped('hsla', payload)

      if (hsla && !hsla.some(isNaN)) {
        return {
          hex,
          rgba,
          hsla: payload,
        };
      }
      return {
        ...state,
        hsla: payload,
      };
    }

    default:
      return state;
  }
}
