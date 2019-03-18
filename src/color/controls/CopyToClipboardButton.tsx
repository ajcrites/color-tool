/**
 * Button that copies the provided value to clipboard
 */

import React, { useState, useEffect } from 'react';

export const CopyToClipboardButton = ({ value }) => {
  // Hide this button if the Clipboard API is not supported
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setDisplay(
          (await (navigator as any).permissions.query({ name: 'clipboard-write' })).state ===
            'granted',
        );
      } catch {}
    })();
  }, []);

  const copyToClipboard = () => (navigator as any).clipboard.writeText(value);

  return display ? (
    <button className="copy-to-clipboard-button" onClick={copyToClipboard}>
      <img width="16" height="16" src="copy-to-clipboard.svg" alt="copy to clipboard" />
    </button>
  ) : null;
};
