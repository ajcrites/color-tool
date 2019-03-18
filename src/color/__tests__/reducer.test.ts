import { colorReducer } from '../reducer';
import * as actions from '../actions';

// tslint:disable:no-big-function
describe('colorReducer', () => {
  describe('hex', () => {
    test('update rgba and hsla from valid hex', () => {
      const testHex = '#abcdef';

      const nextState = colorReducer({} as any, actions.updateHex(testHex));

      expect(nextState).toEqual({
        rgba: [171, 205, 239, 1],
        hsla: [210, 68, 80, 1],
        hex: testHex,
        keyword: '',
        hasKeyword: false,
      });
    });

    test('update rgba, hsla, and keyword from valid hex with corresponding keyword', () => {
      const testHex = '#ff6347';

      const nextState = colorReducer({} as any, actions.updateHex(testHex));

      expect(nextState).toEqual({
        rgba: [255, 99, 71, 1],
        hsla: [9, 100, 64, 1],
        hex: testHex,
        keyword: 'tomato',
        hasKeyword: true,
      });
    });

    test('do not update colors with invalid hex', () => {
      const testHex = 'not valid hex';

      const nextState = colorReducer({} as any, actions.updateHex(testHex));

      expect(nextState).toEqual({
        hex: testHex,
      });
    });

    // tslint:disable-next-line:no-identical-functions
    test('do not update colors with incomplete hex', () => {
      const testHex = '#ff';

      const nextState = colorReducer({} as any, actions.updateHex(testHex));

      expect(nextState).toEqual({
        hex: testHex,
      });
    });
  });

  describe('keyword', () => {
    test('update color with valid and existing keyword', () => {
      const testKeyword = 'forestgreen';

      const nextState = colorReducer(
        {} as any,
        actions.updateKeyword(testKeyword),
      );

      expect(nextState).toEqual({
        rgba: [34, 139, 34, 1],
        hsla: [120, 61, 34, 1],
        hex: '#228b22',
        keyword: testKeyword,
        hasKeyword: true,
      });
    });

    test('do not update other color representations with nonexistent keyword', () => {
      const testKeyword = 'notacolor';
      const currentState = {
        rgba: [34, 139, 34, 1],
        hsla: [120, 61, 34, 1],
        hex: '#228b22',
        keyword: 'forestgreen',
        hasKeyword: true,
      };

      const nextState = colorReducer(
        currentState,
        actions.updateKeyword(testKeyword),
      );

      expect(nextState).toEqual({
        ...currentState,
        keyword: testKeyword,
        hasKeyword: false,
      });
    });

    // tslint:disable-next-line:no-identical-functions
    test('do not update other color representations with invalid keyword', () => {
      const testKeyword = 'A7& -';
      const currentState = {
        rgba: [34, 139, 34, 1],
        hsla: [120, 61, 34, 1],
        hex: '#228b22',
        keyword: 'forestgreen',
        hasKeyword: true,
      };

      const nextState = colorReducer(
        currentState,
        actions.updateKeyword(testKeyword),
      );

      expect(nextState).toEqual({
        ...currentState,
        keyword: testKeyword,
        hasKeyword: false,
      });
    });
  });

  describe('multi', () => {
    test('update color representations from valid rgba', () => {
      const testRgba = [255, 220, 120, 1];

      const nextState = colorReducer(
        {} as any,
        actions.updateMulti('rgba', testRgba),
      );

      expect(nextState).toEqual({
        rgba: testRgba,
        hsla: [44, 100, 74, 1],
        hex: '#ffdc78',
        keyword: '',
        hasKeyword: false,
      });
    });

    test('do not update color representations from invalid rgba', () => {
      const testRgba = [255, 220, 'a', 1];
      const currentState = {
        rgba: [255, 220, 120, 1],
        hsla: [44, 100, 74, 1],
        hex: '#ffdc78',
        keyword: 'blarg',
        hasKeyword: false,
      };

      const nextState = colorReducer(
        currentState,
        actions.updateMulti('rgba', testRgba),
      );

      expect(nextState).toEqual({
        ...currentState,
        rgba: testRgba,
      });
    });

    test('update color representations from valid hsla', () => {
      const testHsla = [180, 50, 75, 1];

      const nextState = colorReducer(
        {} as any,
        actions.updateMulti('hsla', testHsla),
      );

      expect(nextState).toEqual({
        rgba: [159, 223, 223, 1],
        hsla: testHsla,
        hex: '#9fdfdf',
        keyword: '',
        hasKeyword: false,
      });
    });

    test('do not update color representations from invalid hsla', () => {
      const testHsla = [180, 'b', 75, 1];
      const currentState = {
        rgba: [255, 220, 120, 1],
        hsla: [44, 100, 74, 1],
        hex: '#ffdc78',
        keyword: 'blarg',
        hasKeyword: false,
      };

      const nextState = colorReducer(
        currentState,
        actions.updateMulti('hsla', testHsla),
      );

      expect(nextState).toEqual({
        ...currentState,
        hsla: testHsla,
      });
    });

    test('retain keyword when updating with invalid value', () => {
      const testHsla = [180, 'b', 75, 1];
      const currentState = {
        rgba: [75, 0, 130, 1],
        hsla: [275, 100, 25, 1],
        hex: '#4b0082',
        keyword: 'indigo',
        hasKeyword: true,
      };

      const nextState = colorReducer(
        currentState,
        actions.updateMulti('hsla', testHsla),
      );

      expect(nextState).toEqual({
        ...currentState,
        hsla: testHsla,
      });
    });

    test('clamp values for rgba to valid values when possible', () => {
      const testRgba = [350, -25, 800, 4];

      const nextState = colorReducer(
        {} as any,
        actions.updateMulti('rgba', testRgba),
      );

      expect(nextState).toEqual({
        rgba: [255, 0, 255, 1],
        hsla: [300, 100, 50, 1],
        hex: '#ff00ff',
        keyword: 'magenta',
        hasKeyword: true,
      });
    });

    test('clamp values for hsla to valid values when possible', () => {
      const testHsla = [-250, 70.8, 50, -8];

      const nextState = colorReducer(
        {} as any,
        actions.updateMulti('hsla', testHsla),
      );

      expect(nextState).toEqual({
        rgba: [218, 37, 37, 0],
        hsla: [0, 71, 50, 0],
        hex: '#da2525',
        keyword: '',
        hasKeyword: false,
      });
    });
  });
});
