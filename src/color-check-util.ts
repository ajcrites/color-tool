import parse from 'parse-color';

// Utility functions for checking and creating valid parsed colors

/**
 * Check that the provided string value is a valid number. Numbers can be parsed
 * from strings that do not match this regex, e.g. `'1a'` will be parsed as
 * `1`, but we only want to parse strictly numeric values and pass others through
 */
export function isValidNumber(value: string | number) {
  return /(^-?\d+(\.\d+)?$)|^\.\d+$/.test(value as string);
}

export function clampMultiColorValue(
  parser: 'rgba' | 'hsla',
  value: number,
  idx: number,
) {
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

// Clamp an array of multi-color values
export function clampMultiColor(parser: 'rgba' | 'hsla', values: number[]) {
  return values.map((value, idx) => clampMultiColorValue(parser, value, idx));
}

// Parse color from provided values that are clamped
export function parseAsClamped(parser: 'hsla' | 'rgba', values: number[]) {
  return parse(`${parser}(${clampMultiColor(parser, values)})`);
}

// Determine whether the input is valid. An empty string or any partial hex
// value will be valid.
export function isValidHex(hexValue: string) {
  return !hexValue || /^#[a-f0-9]{1,6}$/i.test(hexValue);
}

// Determine whether the input is valid. All keywords are pure lowercase alpha.
export function isValidKeyword(keywordValue: string) {
  return !keywordValue || /^[a-z]*$/.test(keywordValue);
}
