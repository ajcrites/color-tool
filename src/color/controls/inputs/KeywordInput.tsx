/**
 * Input that handles a css keyword for colors
 */

import React, { useContext } from 'react';

import { ColorToolContext } from '~/ColorToolContext';
import { updateKeyword } from '~/color/actions';
import { CopyToClipboardButton } from '~/color/controls/CopyToClipboardButton';
import { isValidKeyword } from '~/color-check-util';

export const KeywordInput = () => {
  const { keyword, hasKeyword, dispatch } = useContext(ColorToolContext);

  const onChange = ({ target: { value } }) => {
    dispatch(updateKeyword(value));
  };

  return (
    <section aria-label="Keyword" className="color-input-container">
      <label className="color-input-label">
        <span className="input-label-text">Keyword:</span>

        <input
          className={'color-input ' + (isValidKeyword(keyword) ? '' : ' invalid')}
          type="text"
          value={keyword}
          onChange={onChange}
          style={{
            color: hasKeyword ? '' : '#9FA9A3',
          }}
        />
      </label>
      <CopyToClipboardButton value={keyword} />
    </section>
  );
};
