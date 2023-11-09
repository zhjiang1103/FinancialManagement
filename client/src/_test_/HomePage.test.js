import {render, screen, act} from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../components/HomePage/HomePage'

test('renders the HomePage component', () => {
    // Arrange: Render the component
    // eslint-disable-next-line testing-library/no-unnecessary-act
    
        render(<HomePage />);

  
    // Act: Nothing to act on
  
    // Assert: Check if the component and its content is rendered correctly
    const popularMoviesTitle = screen.getByText('Popular Movies');
    expect(popularMoviesTitle).toBeInTheDocument();
  
  });