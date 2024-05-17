import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import AddGoalForm from './AddGoalForm';

test('renders AddGoalForm component', () => {
  const handleAddGoal = jest.fn();
  const setNewGoal = jest.fn();
  const setNewAmount = jest.fn();

 
  const { getByText, getByPlaceholderText } = render(
    <AddGoalForm
      newGoal=""
      newAmount=""
      handleAddGoal={handleAddGoal}
      setNewGoal={setNewGoal}
      setNewAmount={setNewAmount}
    />
  );

  const addButton = screen.getByText('Add Goal');
  const goalInput = screen.getByPlaceholderText('Enter goal');
  const amountInput = screen.getByPlaceholderText('Enter amount');

  fireEvent.change(goalInput, { target: { value: 'My Goal' } });
  fireEvent.change(amountInput, { target: { value: '100' } });

  fireEvent.click(addButton);

  expect(handleAddGoal).toHaveBeenCalledTimes(1);
  expect(setNewGoal).toHaveBeenCalledWith('My Goal');
  expect(setNewAmount).toHaveBeenCalledWith('100');
});
