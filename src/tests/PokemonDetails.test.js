import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Fazendo teste para o Componente PokemonDetails', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const pikachuDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    const summary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    const pokSummary = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(pikachuDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokSummary).toBeInTheDocument();
  });

  test('Teste se existe uma seção com os mapas das localizações do pokémon.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const gameLocation = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });

    const viridianForest = screen.getByText(/kanto viridian forest/i);
    const powerPlant = screen.getByText(/Kanto Power Plant/i);
    const pikachuLocation1 = screen.getAllByRole('img', {
      name: /pikachu location/i,
    })[0];
    const pikachuLocation2 = screen.getAllByRole('img', {
      name: /pikachu location/i,
    })[1];

    expect(gameLocation).toBeInTheDocument();
    expect(viridianForest).toBeInTheDocument();
    expect(powerPlant).toBeInTheDocument();
    expect(pikachuLocation1).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocation2).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Teste se o usuário pode favoritar o pokémon através da página detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favoriteCheck);
    const favoriteChecked = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteChecked).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    expect(favoriteChecked).not.toBeInTheDocument();

    const labolPokemon = screen.getByText(/pokémon favoritado?/i);
    expect(labolPokemon).toBeInTheDocument();
  });
});
