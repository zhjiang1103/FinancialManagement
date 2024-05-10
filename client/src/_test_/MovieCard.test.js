import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';
import { BrowserRouter as Router } from 'react-router-dom';

describe('MovieCard', () => {
  test('renders book card with title and image', () => {
    const title = 'Test book';
    const img = 'https://example.com/image.jpg';
    const id = '123';

    render(
      <Router>
        <MovieCard title={title} img={img} id={id} />
      </Router>
    );

    const cardTitle = screen.getByText(title);
    expect(cardTitle).toBeInTheDocument();

    const cardImage = screen.getByRole('img');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', img);
  });

  test('renders link to book details page', () => {
    const id = '123';

    render(
      <Router>
        <MovieCard title="Test book" img="https://example.com/image.jpg" id={id} />
      </Router>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/movies/${id}`);
  });
});
