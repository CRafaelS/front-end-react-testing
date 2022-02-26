import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Fazendo teste para o Componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<App />);

    pokemons.forEach(({
      name, type, averageWeight: { value, measurementUnit }, image,
    }) => {
      const namePokemon = screen.getByText(name);
      const typePokemon = screen.getByTestId('pokemon-type');
      const weightPokemon = screen
        .getByText(`Average weight: ${value} ${measurementUnit}`);
      const imagePokémon = screen.getByRole('img', { name: `${name} sprite` });
      expect(namePokemon).toBeInTheDocument();
      expect(typePokemon.innerHTML).toBe(type);
      expect(weightPokemon).toBeInTheDocument();
      expect(imagePokémon).toBeInTheDocument();
      expect(imagePokémon.src).toBe(image);
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      userEvent.click(nextButton);
    });
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link detalhes.', () => {
    const { history } = renderWithRouter(<App />);

    const { id } = pokemons[0];
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails.href).toBe(`http://localhost/pokemons/${id}`);
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Teste se ao clicar no link, é feito o redirecionamento da aplicação.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const sumary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    const gameLocations = screen
      .getByRole('heading', { name: /game Locations/i, level: 2 });
    expect(sumary).toBeInTheDocument();
    expect(gameLocations).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const iconStar = '/star-icon.svg';

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favoriteCheck);

    const clickFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(clickFavorite);

    const pikachuFavorite = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(pikachuFavorite).toHaveAttribute('src', iconStar);
    expect(pikachuFavorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
