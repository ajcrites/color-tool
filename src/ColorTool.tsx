/**
 * Container for the Color Tool. This includes the color tool app,
 * a description, and appropriate links.
 */

import React, { useState, Fragment } from 'react';

import { ColorToolApp } from './ColorToolApp';
import { CopyToClipboardButton } from '~/color/controls/CopyToClipboardButton';

export const ColorTool = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => setCollapsed(!collapsed);
  const stopPropagation = e => e.stopPropagation();

  return (
    <Fragment>
      <div role="document" className={'intro ' + (collapsed ? 'collapsed' : '')}>
        <h1>CSS Color Tool</h1>
        <a onClick={stopPropagation} href="#color-tool">
          main
        </a>
        <p>
          This CSS color tool allows you to experiment with various different colors and see
          different CSS representations of those colors. Updating any of the input values will
          update the others for the color represented by the corresponding type of value. You can
          input any of:
        </p>
        <ul>
          <li>
            A hex color code: <kbd>#</kbd> followed by six hexadecimal characters.
          </li>
          <li>RGBA: three values of 255 and an alpha transparency value between 0 and 1.</li>
          <li>
            HSLA: a hue, which is a number between 0 and 359, a saturation between 0 and 100, a
            lightness between 0 and 100, and an alpha transparency value between 0 and 1.
          </li>
          <li>Keyword: A CSS color keyword which is all lowercase letters.</li>
        </ul>
        <p>
          A color picker is also available for browsers that support it. Additionally, buttons are
          available where supported to copy color representations to the clipboard. You can also
          paste in a color representation. For example, try pasting <code>rgba(255,99,71,1)</code>
          <CopyToClipboardButton value="rgba(255,99,71,1)" /> into any of the RGBA inputs. This will
          normalize to the RGBA values in the corresponding inputs and update all of the other
          colors.
        </p>
        <p>
          There are also buttons available to manipulate the selected color in various ways such as
          ligtening and darkening.
        </p>
        <button
          aria-label={collapsed ? 'expand' : 'collapse'}
          onClick={toggleCollapse}
          className="collapse-button">
          {collapsed ? '▼' : '▲'}
        </button>
      </div>
      <ColorToolApp />
    </Fragment>
  );
};
