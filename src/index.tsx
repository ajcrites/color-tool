import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ColorToolApp } from './ColorToolApp';
import './style.css';

ReactDOM.render(<ColorToolApp />, document.getElementById('root'));

/*
import parse from 'parse-color';

document.querySelectorAll('.colors input').forEach(input => {
  input.addEventListener('input', ({ currentTarget }) => {
    const input = currentTarget as HTMLInputElement;
    const color = input.value;

    const { hex, rgba, hsla } = parse(color);

    const colorValid =
      hex &&
      rgba &&
      hsla &&
      !/NaN/.test(hex) &&
      !rgba.some(isNaN) &&
      !hsla.some(isNaN);

    if (!colorValid) {
      input.style.backgroundColor = 'hsl(0, 85%, 90%)';
    } else {
      input.style.backgroundColor = null;
      (document.querySelector(
        '#color',
      ) as HTMLDivElement).style.backgroundColor = hex;
    }

    ['hex', 'rgb', 'hsl'].map(colorType => {
      const colorInput = document.querySelector(
        `#${colorType}`,
      ) as HTMLInputElement;
      if (colorInput !== currentTarget && colorValid) {
        switch (colorType) {
          case 'hex':
            if (hex) {
              colorInput.value = hex;
            }
            break;
          case 'rgb':
            if (rgba) {
              colorInput.value = `rgba(${rgba.join()})`;
            }
            break;
          case 'hsl':
            if (hsla) {
              colorInput.value = `hsla(${hsla.join()})`;
            }
            break;
        }
      }
    });
  });
});

document.querySelectorAll('#lighten, #darken').forEach(element =>
  element.addEventListener('click', () => {
    const hslInput = document.querySelector('#hsl') as HTMLInputElement;
    const { hsl } = parse(hslInput.value);

    if (hsl) {
      hslInput.value = `hsl(${hsl[0]}, ${hsl[1]}, ${
        element.id === 'lighten'
          ? Math.min(100, hsl[2] + 10)
          : Math.max(0, hsl[2] - 10)
      })`;
      hslInput.dispatchEvent(new Event('input'));
    }
  }),
);
*/
