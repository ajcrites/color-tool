/**
 * Button that copies the provided value to clipboard
 */

import React, { useState, useEffect } from 'react';

export interface CopyToClipboardButtonProps {
  value: string;
}

export const CopyToClipboardButton: React.FunctionComponent<CopyToClipboardButtonProps> = ({ value }) => {
  // Hide this button if the Clipboard API is not supported
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setDisplay(
          (await navigator.permissions.query({
            name: 'clipboard-write' as 'clipboard',
          })).state === 'granted',
        );
      } catch {}
    })();
  }, []);

  const copyToClipboard = () => navigator.clipboard.writeText(value);

  return display ? (
    <button className="copy-to-clipboard-button" onClick={copyToClipboard}>
      <img
        width="16"
        height="16"
        src="copy-to-clipboard.svg"
        alt="copy to clipboard"
      />
    </button>
  ) : null;
};
