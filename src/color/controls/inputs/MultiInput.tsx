/**
 * Component for managing colors constructed from multiple parts
 * This applies to the rgba and hsla inputs specifically
 */

import React, { useContext, useRef, FunctionComponent } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '~/ColorToolContext';
import { updateMulti } from '~/color/actions';
import { isValidNumber } from '~/color-check-util';
import { CopyToClipboardButton } from '~/color/controls/CopyToClipboardButton';

export interface MultiInputProps {
  parser: 'rgba' | 'hsla';
  label: string;
}

export const MultiInput: FunctionComponent<MultiInputProps> = ({ parser, label }) => {
  const { [parser]: color, dispatch } = useContext(ColorToolContext);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onChange = () => ({ target: { value } }) => {
    // Get values of all current inputs. The input we are updating should
    // yield a new value based on user input.
    const currentColorValues = inputs.map(({ current: { value } }) => value);

    // Check whether the updated input has a valid color string to parse
    const { [parser]: parsedFromInput } = parse(value);
    if (parsedFromInput && !parsedFromInput.some(isNaN)) {
      dispatch(updateMulti(parser, parsedFromInput));
    } else {
      dispatch(updateMulti(parser, currentColorValues));
    }
  };

  return (
    <section aria-label={label} className="color-input-container">
      <label className="color-input-label">
        <span className="input-label-text">{label}</span>
        <div className="multi-input-container">
          {inputs.map((input, idx) => (
            <input
              className={
                'color-input ' + (!color[idx] || isValidNumber(color[idx] + '') ? '' : 'invalid')
              }
              type="text"
              key={idx}
              ref={input}
              value={color[idx]}
              onChange={onChange()}
              aria-label={`${label}${parser[idx].toUpperCase()}`}
              style={{
                width: 50,
                marginRight: idx === 3 ? 0 : 10,
              }}
            />
          ))}
        </div>
      </label>
      <CopyToClipboardButton value={`${parser}(${color.join()})`} />
    </section>
  );
};
