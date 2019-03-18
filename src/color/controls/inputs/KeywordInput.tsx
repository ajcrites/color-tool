import React, { useContext } from 'react';
import parse from 'parse-color';

import { ColorToolContext } from '~/ColorToolContext';
import { updateKeyword } from '~/color/actions';
import { CopyToClipboardButton } from '~/color/controls/CopyToClipboardButton';

export const KeywordInput = () => {
  const { keyword, dispatch } = useContext(ColorToolContext);

  const onChange = ({ target: { value } }) => {
    dispatch(updateKeyword(value));
  };

  return (
    <section aria-label="Keyword" className="color-input-container">
      <label className="color-input-label">
        <span className="input-label-text">Keyword:</span>

        <input
          className="color-input"
          type="text"
          value={keyword}
          onChange={onChange}
          style={{
            backgroundColor: /^[a-z]*$/.test(keyword) ? '' : '#ffb8c2',
            color: parse(keyword).hex ? '' : '#9FA9A3',
          }}
        />
      </label>
      <CopyToClipboardButton value={keyword} />
    </section>
  );
};
