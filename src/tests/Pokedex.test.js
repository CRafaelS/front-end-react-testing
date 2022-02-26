import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Fazendo teste para o Componente Pokedex', () => {
  test('Teste se a aplicação é redirecionada para a página inicial.', () => {
    renderWithRouter(<App />);

    const subTitleHome = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(subTitleHome).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial.', () => {
    renderWithRouter(<App />);

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
    renderWithRouter(<App />);

    const numPokémon = screen.getAllByRole('img', { name: /sprite/i });
    expect(numPokémon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
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
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(allBtn);
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(btnNext);

    const firePok = screen.getByRole('img', { name: /Charmander sprite/i });
    expect(firePok).toBeInTheDocument();
    expect(allBtn).toHaveTextContent('All');
    expect(allBtn).toBeEnabled();
  });
});
