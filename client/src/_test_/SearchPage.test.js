import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchPage from '../components/SearchPage/SearchPage';


// Mock the API functions
jest.mock('../API', () => ({
  fetchByTitle: jest.fn(),
  fetchByPerson: jest.fn(),
}));

describe('SearchPage', () => {
  it('renders the SearchPage component', () => {
    // Arrange: Render the component
    render(<SearchPage />);

    // Act: Find elements
    const searchButton = screen.getByText('Search');

    // Assert: Check if elements are in the document
    expect(searchButton).toBeInTheDocument();
  });

 
  });

