import React, { useContext, useRef, useState, FunctionComponent } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '~/ColorToolContext';
import { updateMulti } from '~/color/actions';
import { isValidNumber } from '~/color-check-util';
import { CopyToClipboardButton } from './CopyToClipboardButton';

export interface MultiInputProps {
  parser: 'rgba' | 'hsla';
  label: string;
}

export const MultiInput: FunctionComponent<MultiInputProps> = ({ parser, label }) => {
  const { [parser]: color, dispatch } = useContext(ColorToolContext);
  const [inputValidity, setInputValidity] = useState([true, true, true, true]);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onChange = changedIdx => ({ target: { value } }) => {
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

      // Treat '0.' as invalid to guide users to add a number after the decimal
      if (isNaN(Math.max(0, value))) {
        inputValidity[changedIdx] = false;
      } else {
        inputValidity[changedIdx] = true;
      }
      setInputValidity(inputValidity);
    }
  };

  return (
    <label>
      <span className="input-label">{label}</span>
      {inputs.map((input, idx) => (
        <input
          className="color-input"
          type="text"
          key={idx}
          ref={input}
          value={color[idx]}
          onChange={onChange(idx)}
          style={{
            width: 50,
            marginRight: idx === 3 ? 0 : 10,
            backgroundColor: !color[idx] || isValidNumber(color[idx] + '') ? '' : '#ffb8c2',
          }}
        />
      ))}
      <CopyToClipboardButton value={`${parser}(${color.join()})`} />
    </label>
  );
};
