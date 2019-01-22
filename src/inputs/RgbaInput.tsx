import React, { useContext, useRef } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '../ColorToolContext';

export const RgbaInput = () => {
  const { rgba, setHex, setRgba, setHsla } = useContext(ColorToolContext);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onChange = changedIdx => ({ target: { value } }) => {
    const currentRgbValues = inputs.map((input, idx) => {
      if (idx === changedIdx) {
        return value;
      }

      return input.current.value;
    });

    // Check whether one of the inputs has a valid rgb(a) string to parse
    const parsedFromInput = parse(value);
    if (parsedFromInput.rgba && !parsedFromInput.rgba.some(isNaN)) {
      setHex(parsedFromInput.hex);
      setHsla(parsedFromInput.hsla);
      setRgba(parsedFromInput.rgba);
    } else {
      const { hex, rgba: parsedRgba, hsla } = parse(
        `rgba(${currentRgbValues[0]}, ${currentRgbValues[1]}, ${
          currentRgbValues[2]
        }, ${currentRgbValues[3]})`,
      );

      if (parsedRgba && !parsedRgba.some(isNaN)) {
        setHex(hex);
        setHsla(hsla);
      }

      setRgba(currentRgbValues);
    }
  };

  return (
    <label>
      RGB(A):
      {inputs.map((input, idx) => (
        <input
          type="text"
          key={idx}
          ref={input}
          value={rgba[idx]}
          onChange={onChange(idx)}
        />
      ))}
    </label>
  );
};
