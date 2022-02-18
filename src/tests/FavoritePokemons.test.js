import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Teste se é redirecionada para a página de Pokémons Favoritados.', () => {
  const favoritesHistory = createMemoryHistory();

  render(
    <Router history={ favoritesHistory }>
      <App />
    </Router>,
  );

  favoritesHistory.push('/favorites');
  const noFavorite = screen.getByText(/no favorite pokemon found/i);
  expect(noFavorite).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const clickHome = screen.getByRole('link', { name: 'Home' });
  userEvent.click(clickHome);

  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(moreDetails);

  const favoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
  userEvent.click(favoriteCheck);

  const clickFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(clickFavorite);

  const pikachuFavorite = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(pikachuFavorite).toBeInTheDocument();
});
