import React, { useContext, useRef, useState, FunctionComponent } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '../ColorToolContext';
import { clampMultiColorValue, parseAsClamped } from '../color-check-util';

export interface MultiInputProps {
  parser: 'rgba' | 'hsla';
  label: string;
}

export const MultiInput: FunctionComponent<MultiInputProps> = ({
  parser,
  label,
}) => {
  const ctx = useContext(ColorToolContext);
  const [inputValidity, setInputValidity] = useState([true, true, true, true]);
  const color = ctx[parser];
  const setColor = ctx[`set${parser[0].toUpperCase()}${parser.substring(1)}`];
  const { setHex, setHsla, setRgba } = ctx;
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onChange = changedIdx => ({ target: { value } }) => {
    let invalidInput = isNaN(Math.max(0, value));
    const currentColorValues = inputs.map((input, idx) => {
      if (idx === changedIdx) {
        if (value === '' || invalidInput) {
          return value;
        }

        return clampMultiColorValue(parser, value, idx);
      }

      return input.current.value;
    });

    // Check whether one of the inputs has a valid rgb(a)/hsl(a) string to parse
    const parsedFromInput = parseAsClamped(parser, value);
    if (parsedFromInput) {
      setHex(parsedFromInput.hex);
      setHsla(parsedFromInput.hsla);
      setRgba(parsedFromInput.rgba);
      setInputValidity([true, true, true, true]);
    } else {
      const { hex, rgba, hsla } = parse(
        `${parser}(
          ${currentColorValues[0]},
          ${currentColorValues[1]},
          ${currentColorValues[2]},
          ${currentColorValues[3]}
        )`,
      );

      if (rgba && !rgba.some(isNaN) && hsla && !hsla.some(isNaN)) {
        setHex(hex);
        setHsla([
          Math.min(360, Math.max(0, hsla[0])),
          ...hsla.slice(1, 3).map(value => Math.min(100, Math.max(0, value))),
          Math.min(1, Math.max(0, hsla[3])),
        ]);
        setRgba([
          ...rgba.slice(0, 3).map(value => Math.min(255, Math.max(0, value))),
          Math.min(1, Math.max(0, rgba[3])),
        ]);
      }

      if (invalidInput) {
        inputValidity[changedIdx] = false;
      } else {
        inputValidity[changedIdx] = true;
      }
      setInputValidity(inputValidity);

      setColor(currentColorValues);
    }
  };

  return (
    <label>
      {label}
      {inputs.map((input, idx) => (
        <input
          type="text"
          key={idx}
          ref={input}
          value={color[idx]}
          onChange={onChange(idx)}
          style={{
            backgroundColor: inputValidity[idx] ? '' : '#ffb8c2',
          }}
        />
      ))}
    </label>
  );
};
