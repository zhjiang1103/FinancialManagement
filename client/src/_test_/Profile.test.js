import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../components/ProfilePage/profile';

const user = {
  email: 'user@example.com', // Replace with your user data
};

test('renders the Profile component', () => {
  // Arrange: Render the component
  render(<Profile user={user}/>);

  // Assert: Perform your assertions
  // Add your assertions here. For example:
  const emailText = screen.getByText(/user@example.com/i); // Replace with the email you provided
  expect(emailText).toBeInTheDocument();

  // You can add more assertions based on your component's content.
});
