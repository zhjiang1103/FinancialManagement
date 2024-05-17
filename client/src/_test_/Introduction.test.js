import React from 'react';
import { render, screen } from '@testing-library/react';
import Introduction from './Introduction';

describe('Introduction', () => {
  test('renders welcome message', () => {
    const { getByText } = render(<Introduction />);
    const welcomeMessage = screen.getByText(/Welcome to Financial Manager!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders platform description', () => {
    const { getByText } = render(<Introduction />);
    const description = screen.getByText(/We provide a platform for you to manage your personal financial health, and helping you make informed financial decisions./i);
    expect(description).toBeInTheDocument();
  });

  test('renders AuthNav component', () => {
    const { getByRole } = render(<Introduction />);
    const authNav = screen.getByRole('navigation');
    expect(authNav).toBeInTheDocument();
  });
});
