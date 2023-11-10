import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';
import { BrowserRouter } from 'react-router-dom';

// Mock the movie data
const movie = {
  id: 123,
  title: 'Sample Movie',
  poster_path: '/sample-poster.jpg',
};

test('renders MovieCard component', () => {
  // Render the MovieCard component with the movie data
  render(
    <BrowserRouter>
      <MovieCard movie={movie} />
    </BrowserRouter>
  );

  // Check if the movie title is rendered
  const titleElement = screen.getByText('Sample Movie');
  expect(titleElement).toBeInTheDocument();

  // Check if the movie poster is rendered
  const posterElement = screen.getByAltText('Sample Movie');
  expect(posterElement).toBeInTheDocument();

  
});
