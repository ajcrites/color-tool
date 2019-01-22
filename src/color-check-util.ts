import parse from 'parse-color';

// Utility functions for checking and creating valid parsed colors

export function clampMultiColorValue(parser: 'rgba' | 'hsla', value, idx) {
  let maxClamp;
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

export function parseAsClamped(parser, values: string) {
  const { [parser]: color } = parse(values);

  if (color && !color.some(isNaN)) {
    return parse(`${parser}(${clampMultiColor(parser, color)})`);
  }
}
