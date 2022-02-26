import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Fazendo teste para o Componente App', () => {
  test('Teste se a aplicação é redirecionada para a página inicial.', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const subTitleHome = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(subTitleHome).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página de About.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const subTitleAbout = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(subTitleAbout).toBeInTheDocument();
  });

  test('Teste se é redirecionada para a página de Pokémons Favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const homeLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    expect(homeLink).toBeInTheDocument();

    const subTitleHome = screen.getByRole('heading', {
      name: 'Favorite pokémons',
      level: 2,
    });
    expect(subTitleHome).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página Not Found.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/test-notFound-page');

    const notFoundSubTitle = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundSubTitle).toBeInTheDocument();
  });
});
