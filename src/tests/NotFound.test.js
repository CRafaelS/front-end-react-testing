import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Fazendo teste para o Componente NotFound', () => {
  test('Teste se página tem um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound-page');

    const notFoundSubTitle = screen.getByRole('heading', {
      name: /Page requested not found /i,
      level: 2,
    });
    expect(notFoundSubTitle).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound-page');

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const findImag = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(findImag.src).toBe(url);
  });
});
