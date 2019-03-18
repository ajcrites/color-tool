import parse from 'parse-color';

// Utility functions for checking and creating valid parsed colors

/**
 * Check that the provided string value is a valid number. Numbers can be parsed
 * from strings that do not match this regex, e.g. `'1a'` will be parsed as
 * `1`, but we only want to parse strictly numeric values and pass others through
 */
export function isValidNumber(value: string) {
  return /(^-?\d+(\.\d+)?$)|^\.\d+$/.test(value);
}

export function clampMultiColorValue(parser: 'rgba' | 'hsla', value, idx) {
  let maxClamp;
  let inputValue;

  // Clamp value based on parser and position
  if (parser === 'rgba' && idx < 3) {
    maxClamp = 255;
  } else if (parser === 'hsla' && idx === 0) {
    maxClamp = 359;
  } else if (parser === 'hsla' && idx > 0 && idx < 3) {
    maxClamp = 100;
  } else {
    maxClamp = 1;
  }

  // First three values are whole numbers, but alpha is between 0 and 1
  if (idx < 3) {
    inputValue = Math.round(value);
  } else {
    inputValue = value;
  }

  return Math.min(maxClamp, Math.max(0, inputValue));
}

export function clampMultiColor(parser: 'rgba' | 'hsla', values: number[]) {
  return values.map((value, idx) => clampMultiColorValue(parser, value, idx));
}

export function parseAsClamped(parser, values: number[]) {
  return parse(`${parser}(${clampMultiColor(parser, values)})`);
}

export function isValidHex(hexValue) {
  return !hexValue || /^#[a-fA-F0-9]*$/.test(hexValue);
}

// All keywords are pure lowercase alpha
export function isValidKeyword(keywordValue) {
  return !keywordValue || /^[a-z]*$/.test(keywordValue);
}
