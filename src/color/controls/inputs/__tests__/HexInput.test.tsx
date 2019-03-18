import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';

import { ColorToolContext } from '~/ColorToolContext';
import { updateHex } from '~/color/actions';
import { HexInput } from '../HexInput';

describe('HexInput component', () => {
  afterEach(cleanup);

  test('set # on empty input on focus', () => {
    const state: any = {
      dispatch: jest.fn(),
    };
    const { container } = render((
      <ColorToolContext.Provider value={state}>
        <HexInput />
      </ColorToolContext.Provider>
    ));
    const input = container.querySelector('input');

    fireEvent.focus(input);

    expect(state.dispatch).toHaveBeenCalledWith(updateHex('#'));
    expect(input.classList).not.toContain('invalid');
  });

  test('set invalid class if invalid hex pattern is provided', () => {
    const state: any = {
      hex: 'A7& -',
    };
    const { container } = render((
      <ColorToolContext.Provider value={state}>
        <HexInput />
      </ColorToolContext.Provider>
    ));
    const input = container.querySelector('input');

    expect(input.classList).toContain('invalid');
  });

  test('dispatch updated hex value when input changes', () => {
    const testHex = '#abcef';
    const state: any = {
      dispatch: jest.fn(),
    };
    const { container } = render((
      <ColorToolContext.Provider value={state}>
        <HexInput />
      </ColorToolContext.Provider>
    ));
    const input = container.querySelector('input');

    fireEvent.change(input, { target: { value: testHex } });

    expect(state.dispatch).toHaveBeenCalledWith(updateHex(testHex));
    expect(input.classList).not.toContain('invalid');
  });
});
