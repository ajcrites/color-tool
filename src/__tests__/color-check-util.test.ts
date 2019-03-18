import { isValidKeyword, isValidHex } from '../color-check-util';

describe('utility functions', () => {
  test('is valid keyword check', () => {
    const testValidKeyword = 'abcdef';
    const testTrueKeyword = 'tomato';
    const testInvalidKeyword = 'A7& -';

    const validIsValid = isValidKeyword(testValidKeyword);
    const trueIsValid = isValidKeyword(testTrueKeyword);
    const invalidIsValid = isValidKeyword(testInvalidKeyword);
    const emptyIsValid = isValidKeyword('');

    expect(validIsValid).toBe(true);
    expect(trueIsValid).toBe(true);
    expect(invalidIsValid).toBe(false);
    expect(emptyIsValid).toBe(true);
  });

  test('is valid hex check', () => {
    const testValidHex = '#abCd0f';
    const testValidLookingHex = '#D0';
    const testInvalidHex = '#-%';

    const validIsValid = isValidHex(testValidHex);
    const validLookingIsValid = isValidHex(testValidLookingHex);
    const invalidIsValid = isValidHex(testInvalidHex);
    const emptyIsValid = isValidHex('');

    expect(validIsValid).toBe(true);
    expect(validLookingIsValid).toBe(true);
    expect(invalidIsValid).toBe(false);
    expect(emptyIsValid).toBe(true);
  });
});
