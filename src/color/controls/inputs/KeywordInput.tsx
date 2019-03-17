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
    <section aria-label="Keyword">
      <label>
        <span className="input-label-text">Keyword:</span>

        <input
          className="color-input"
          type="text"
          ref={input}
          value={keyword}
          onChange={onChange}
          style={{
            width: 230,
            backgroundColor: /^[a-z]*$/.test(keyword) ? '' : '#ffb8c2',
            color: parse(keyword).hex ? '' : '#9FA9A3',
          }}
        />
      </label>
      <CopyToClipboardButton value={keyword} />
    </section>
  );
};
