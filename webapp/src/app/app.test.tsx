import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '.';

test('renders app page', () => {
  render(<App />);
  const title = screen.getByText(/Translation App/i);
  expect(title).toBeInTheDocument();
});
