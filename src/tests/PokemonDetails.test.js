import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

test('Teste se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
  const homeHistory = createMemoryHistory();
  render(
    <Router history={ homeHistory }>
      <App />
    </Router>,
  );

  homeHistory.push('/');

  const moreDetails = screen.queryByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const pikachuDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
  const sumary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
  expect(pikachuDetails).toBeInTheDocument();
  expect(moreDetails).not.toBeInTheDocument();
  expect(sumary).toBeInTheDocument();
});
