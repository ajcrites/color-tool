import parse from 'parse-color';

// Utility functions for checking and creating valid parsed colors

export function clampMultiColorValue(parser: 'rgba' | 'hsla', value, idx) {
  let maxClamp;

  // We want to allow empty strings for values. isNaN('') returns `false`,
  // and `Math.max(0, '')` returns `0`, so we do this additional check here
  // to pass empty strings through.
  if (typeof value === 'string' && !/^\d+$/.test(value)) {
    return value;
  }

  if (parser === 'rgba' && idx < 3) {
    maxClamp = 255;
  } else if (parser === 'hsla' && idx === 0) {
    maxClamp = 360;
  } else if (parser === 'hsla' && idx > 0 && idx < 3) {
    maxClamp = 100;
  } else {
    maxClamp = 1;
  }

  return Math.min(maxClamp, Math.max(0, value));
}

export function clampMultiColor(parser: 'rgba' | 'hsla', values: number[]) {
  return values.map((value, idx) => clampMultiColorValue(parser, value, idx));
}

export function parseAsClamped(parser, values: number[]) {
  return parse(`${parser}(${clampMultiColor(parser, values)})`);
}
