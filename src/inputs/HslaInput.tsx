import React, { useContext, useRef } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '../ColorToolContext';

export const HslaInput = () => {
  const { hsla, setHex, setRgba, setHsla } = useContext(ColorToolContext);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onChange = changedIdx => ({ target: { value } }) => {
    const currentHslValues = inputs.map((input, idx) => {
      if (idx === changedIdx) {
        return value;
      }

      return input.current.value;
    });

    const { hex, rgba, hsla: parsedHsla } = parse(
      `hsla(${currentHslValues[0]}, ${currentHslValues[1]}, ${
        currentHslValues[2]
      }, ${currentHslValues[3]})`,
    );

    if (parsedHsla && !parsedHsla.some(isNaN)) {
      setHex(hex);
      setRgba(rgba);
    }

    setHsla(currentHslValues);
  };

  return (
    <label>
      HSL(A):
      {inputs.map((input, idx) => (
        <input
          type="text"
          key={idx}
          ref={input}
          value={hsla[idx]}
          onChange={onChange(idx)}
        />
      ))}
    </label>
  );
};
