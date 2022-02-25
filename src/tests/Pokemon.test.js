import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

  pokemons.forEach(({ name, type, averageWeight: { value, measurementUnit }, image }) => {
    const namePokemon = screen.getByText(name);
    const typePokemon = screen.getByTestId('pokemon-type');
    const weightPokemon = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
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
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

  const { id } = pokemons[0];
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  expect(moreDetails).toBeInTheDocument();
  expect(moreDetails.href).toBe(`http://localhost/pokemons/${id}`);
  userEvent.click(moreDetails);
  expect(homeHistory.location.pathname).toBe(`/pokemons/${id}`);
});

test('Teste se ao clicar no link, é feito o redirecionamento da aplicação.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const sumary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
  const gameLocations = screen
    .getByRole('heading', { name: /game Locations/i, level: 2 });
  expect(sumary).toBeInTheDocument();
  expect(gameLocations).toBeInTheDocument();
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

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
