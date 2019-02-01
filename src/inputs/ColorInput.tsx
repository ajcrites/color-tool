import React, { useContext, useRef, useEffect, useState } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '../ColorToolContext';
import { updateHex } from '../actions';

export const ColorInput = () => {
  const { hex, dispatch } = useContext(ColorToolContext);
  const input = useRef(null);

  // Only show the color input if it's supported by the browser
  const [show, setShow] = useState(true);
  useEffect(() => {
    input.current.value = '!';
    if ('!' === input.current.value) {
      setShow(false);
    }
  }, []);

  const onChange = ({ target: { value } }) => {
    dispatch(updateHex(value));
  };

  return show ? (
    <label>
      Color Picker:
      <input
        type="color"
        ref={input}
        value={parse(hex).hex}
        onChange={onChange}
      />
    </label>
  ) : null;
};
