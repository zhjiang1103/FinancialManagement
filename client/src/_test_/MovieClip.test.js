import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieClip from '../components/MovieClip';

// Mock the YouTube component
jest.mock('react-youtube', () => {
  return function MockedYouTube(props) {
    return <div data-testid="mocked-youtube" />;
  };
});

test('renders the MovieClip component', () => {
  const videoId = 'your-video-id'; // Replace with a valid video ID

  render(<MovieClip videoId={videoId} />);
  
  const youtubeElement = screen.getByTestId('mocked-youtube');
  expect(youtubeElement).toBeInTheDocument();
});
