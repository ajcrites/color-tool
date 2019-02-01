import React, { useContext, useRef, useState, FunctionComponent } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '../ColorToolContext';
import { updateMulti } from '../actions';

export interface MultiInputProps {
  parser: 'rgba' | 'hsla';
  label: string;
}

export const MultiInput: FunctionComponent<MultiInputProps> = ({
  parser,
  label,
}) => {
  const { [parser]: color, dispatch } = useContext(ColorToolContext);
  const [inputValidity, setInputValidity] = useState([true, true, true, true]);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onChange = changedIdx => ({ target: { value } }) => {
    let invalidInput = isNaN(Math.max(0, value));

    // Get values of all current inputs. The input we are updating should
    // yield a new value based on user input.
    const currentColorValues = inputs.map(({ current: { value } }) => value);

    // Check whether one of the inputs has a valid rgb(a)/hsl(a) string to parse
    const parsedFromInput = parse(value);
    if (parsedFromInput[parser]) {
      dispatch(updateMulti(parser, parsedFromInput[parser]));
      setInputValidity([true, true, true, true]);
    } else {
      dispatch(updateMulti(parser, currentColorValues));

      if (invalidInput) {
        inputValidity[changedIdx] = false;
      } else {
        inputValidity[changedIdx] = true;
      }
      setInputValidity(inputValidity);
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
