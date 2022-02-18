import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('Teste se a aplicação é redirecionada para a página inicial.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();

  const subTitleHome = screen.getByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });
  expect(subTitleHome).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de About.', () => {
  const AboutHistory = createMemoryHistory();

  render(
    <Router history={ AboutHistory }>
      <App />
    </Router>,
  );

  AboutHistory.push('/about');

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();

  const subTitleAbout = screen.getByRole('heading', {
    name: 'About Pokédex',
    level: 2,
  });
  expect(subTitleAbout).toBeInTheDocument();
});

test('Teste se é redirecionada para a página de Pokémons Favoritados.', () => {
  const favoritesHistory = createMemoryHistory();

  render(
    <Router history={ favoritesHistory }>
      <App />
    </Router>,
  );

  favoritesHistory.push('/favorites');
  const homeLink = screen.getByRole('link', { name: /Favorite pokémons/i });
  expect(homeLink).toBeInTheDocument();

  const subTitleHome = screen.getByRole('heading', {
    name: 'Favorite pokémons',
    level: 2,
  });
  expect(subTitleHome).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página Not Found.', () => {
  const notFoundHistory = createMemoryHistory();

  render(
    <Router history={ notFoundHistory }>
      <App />
    </Router>,
  );

  notFoundHistory.push('/test-notFound-page');

  const notFoundSubTitle = screen.getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });
  expect(notFoundSubTitle).toBeInTheDocument();
});
