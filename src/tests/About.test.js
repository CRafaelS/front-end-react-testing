import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Fazendo teste para o Componente About', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const subTitleAbout = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(subTitleAbout).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const subTitleAbout = screen.getByRole('heading', {
      name: 'Pokédex',
      level: 1,
    });
    expect(subTitleAbout).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const firstParagraph = screen
      .getByText('This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons');
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen
      .getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const findImag = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    expect(findImag).toHaveAttribute('src', url);
  });
});
