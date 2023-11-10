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

      // Mock API requests here (e.g., Axios.get)
      // Ensure that the component updates after data is loaded

      // Example mock API request with Axios (add more mock responses as needed)
      // axios.get.mockResolvedValue({
      //   data: {
      //     id: 123,
      //     title: 'Sample Movie',
      //     // Other movie data...
      //   },
      // });

      // Wait for the component to update with fetched data
      // For example, you can check if specific movie details are displayed:
      // expect(screen.getByText(/Sample Movie/i)).toBeInTheDocument();
      // Add more assertions based on your component's UI.

      // If the data is dynamically loaded, ensure the component's UI reflects that data.
    });
  });
});
