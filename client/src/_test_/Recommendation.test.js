import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; // Import Axios to mock API requests

import Recommendation from '../components/RecomPage/Recommendation';

// Mock Axios to simulate API requests
jest.mock('axios');

test('renders the Recommendation component', async () => {
  // Mock Axios response data
  const mockData = [
    {
      results: [
        {
          id: 1,
          // Add other movie properties here
        },
        {
          id: 2,
          // Add other movie properties here
        },
      ],
    },
  ];

  // Set up the Axios mock
  axios.get.mockResolvedValue({ data: mockData });

  // Arrange: Render the component
  render(<Recommendation />);


  // Assert: Wait for data loading to complete and render movie cards
  await waitFor(() => {
    const loadingGif = screen.queryByAltText('Loading gif');
    expect(loadingGif).not.toBeInTheDocument();


  });
});
