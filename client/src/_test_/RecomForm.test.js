import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecomForm from '../components/RecomPage/RecomForm';

test('renders the RecomForm component', () => {
  // Arrange: Render the component
  const onSubmit = jest.fn();
  render(<RecomForm onSubmit={onSubmit} />);

  // Act: Simulate user interaction
  const inputPurpose = screen.getByPlaceholderText('purpose');
  fireEvent.change(inputPurpose, { target: { value: 'Hanging out with friends' } });

  const submitButton = screen.getByText('Get Recommendation');
  fireEvent.click(submitButton);

  // Assert: Check if the submit callback was called with the expected purpose
  expect(onSubmit).toHaveBeenCalledWith('Hanging out with friends');
});
