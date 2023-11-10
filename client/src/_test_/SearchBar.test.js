import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/SearchPage/SearchBar';

describe('SearchBar Component', () => {
  it('submits the search form with the entered text', () => {
    const mockSubmit = jest.fn();

    render(<SearchBar onSubmit={mockSubmit} />);

    const searchInput = screen.getByPlaceholderText(
      'Search by movie title or person name'
    );
    const submitButton = screen.getByText('Search');

    // Type a search query into the input field
    fireEvent.change(searchInput, { target: { value: 'Inception' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Ensure that the onSubmit callback was called with the correct value
    expect(mockSubmit).toHaveBeenCalledWith('Inception');
  });
});
