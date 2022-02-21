import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

test('Teste se a aplicação é redirecionada para a página inicial.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

  const subTitleHome = screen.getByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });
  expect(subTitleHome).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

  const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });

  pokemons.forEach((pokemonName) => {
    const pokemon = screen.getByText(pokemonName.name);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(btnNext);
  });

  const firstPokemon = screen.getByText(/pikachu/i);
  expect(firstPokemon).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

  const numPokémon = screen.getAllByRole('img', { name: /sprite/i });
  expect(numPokémon).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );
  homeHistory.push('/');
  // Requisito feito com a ajuda do Cestari e do Calili

  const uniqueTypes = Array.from(new Set(pokemons.map((typePok) => typePok.type)));

  uniqueTypes.forEach((type) => {
    const typeBtn = screen.getAllByRole('button', { name: type });
    expect(typeBtn).toHaveLength(1);
  });

  const electricBtn = screen.getByRole('button', { name: 'Electric' });
  userEvent.click(electricBtn);
  const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(nextBtn.disabled).toBe(true);

  const fireBtn = screen.getByRole('button', { name: 'Fire' });
  userEvent.click(fireBtn);
  const nextFireBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(nextFireBtn.disabled).toBe(false);

  const allTypePokémon = screen.getAllByTestId('pokemon-type-button');
  allTypePokémon.forEach(() => {
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn.disabled).toBe(false);
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(btnNext);
  });
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );
  homeHistory.push('/');

  const allBtn = screen.getByRole('button', { name: /all/i });
  userEvent.click(allBtn);
  const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
  userEvent.click(btnNext);

  const firePok = screen.getByRole('img', { name: /Charmander sprite/i });
  expect(firePok).toBeInTheDocument();
  expect(allBtn).toHaveTextContent('All');
  expect(allBtn).toBeEnabled();
});
