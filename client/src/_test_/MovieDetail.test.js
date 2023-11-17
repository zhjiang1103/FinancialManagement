import React from 'react';
import MovieDetail from '../components/MovieDetail';
import { render, screen, waitFor } from '@testing-library/react';

// Mock the necessary functions and dependencies
jest.mock('axios'); // Mock Axios or any other API requests
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' }), // Mock useParams
}));
const mockUser = {
    email: 'test@example.com',
    // Add other user properties as needed
  };

describe('MovieDetail', () => {
  it('renders the MovieDetail component', async () => {
    // Arrange: Render the component
    render(<MovieDetail user={mockUser} />);

    // Act: Wait for the component to render and fetch data (use waitFor)
    await waitFor(() => {
      // Assert: Perform your assertions
      expect(screen.getByText(/Loading/i)).toBeInTheDocument(); // Loading message should be visible initially

     
      
    });
  });
});
