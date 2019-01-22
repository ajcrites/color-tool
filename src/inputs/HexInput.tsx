import React, { useContext, useRef } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '../ColorToolContext';

export const HexInput = () => {
  const { hex, setHex, setRgba, setHsla } = useContext(ColorToolContext);
  const input = useRef(null);

  const onChange = ({ target: { value } }) => {
    const { hex, rgba, hsla } = parse(value);

    if (hex && !/NaN/.test(hex)) {
      setRgba(rgba);
      setHsla(hsla);
    }

    setHex(value.replace(/#+/, '#').substring(0, 7));
  };

  const onFocus = () => {
    if (!hex) {
      setHex('#');
    }
  };

  return (
    <label>
      Hex:{' '}
      <input
        type="text"
        ref={input}
        value={hex}
        onChange={onChange}
        onFocus={onFocus}
        style={{
          backgroundColor:
            parse(hex).hex || !hex || hex === '#' ? '' : '#ffb8c2',
        }}
      />
    </label>
  );
};
