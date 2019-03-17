import React, { useContext, useRef } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '~/ColorToolContext';
import { updateKeyword } from '~/color/actions';
import { CopyToClipboardButton } from './CopyToClipboardButton';

export const KeywordInput = () => {
  const { keyword, dispatch } = useContext(ColorToolContext);
  const input = useRef(null);

  const onChange = ({ target: { value } }) => {
    dispatch(updateKeyword(value));
  };

  return (
    <label>
      <span className="input-label">Keyword:</span>
      <input
        className="color-input"
        type="text"
        ref={input}
        value={keyword}
        onChange={onChange}
        style={{
          width: 230,
          backgroundColor: /^\w*$/.test(keyword) ? '' : '#ffb8c2',
          color: parse(keyword).hex ? '' : '#9FA9A3',
        }}
      />
      <CopyToClipboardButton value={keyword} />
    </label>
  );
};
