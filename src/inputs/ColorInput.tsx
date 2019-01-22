import React, { useContext, useRef, useEffect, useState } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '../ColorToolContext';

export const ColorInput = () => {
  const { hex, setHex, setRgba, setHsla } = useContext(ColorToolContext);
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
    const { rgba, hsla } = parse(value);
    setHex(value);
    setRgba(rgba);
    setHsla(hsla);
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
