import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('Teste se página tem um heading h2 com o texto Page requested not found 😭', () => {
  const notFoundHistory = createMemoryHistory();

  render(
    <Router history={ notFoundHistory }>
      <App />
    </Router>,
  );

  notFoundHistory.push('/notFound-page');

  const notFoundSubTitle = screen.getByRole('heading', {
    name: /Page requested not found /i,
    level: 2,
  });
  expect(notFoundSubTitle).toBeInTheDocument();
});

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
  const notFoundHistory = createMemoryHistory();
  const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  render(
    <Router history={ notFoundHistory }>
      <App />
    </Router>,
  );

  notFoundHistory.push('/notFound-page');
  const findImag = screen.getByRole('img', {
    name: /Pikachu crying because the page requested was not found/i,
  });
  expect(findImag.src).toBe(url);
});
