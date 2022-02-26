import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Fazendo teste para o Componente FavoritePokemons', () => {
  test('Teste se é redirecionada para a página de Pokémons Favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const noFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

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
});
