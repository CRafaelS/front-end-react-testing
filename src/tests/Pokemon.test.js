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

  const namePokemon = screen.getByText(/pikachu/i);
  expect(namePokemon).toBeInTheDocument();

  const typePokemon = screen.getByText(/Electric/i);
  expect(typePokemon).toBeInTheDocument();
});
