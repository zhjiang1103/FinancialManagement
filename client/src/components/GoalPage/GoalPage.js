import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import AddGoalForm from './AddGoalForm';
import FinancialGoal from './FinancialGoal';

const GoalPage = () => {
  const [goals, setGoals] = useState([{ name: '', amount: '' }])
  const { isAuthenticated, user } = useAuth0();
  
  const handleAddGoal = async () => {
    try {
      const response = await fetch('/api/goal/my', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, goal: goals[0].name, amount: goals[0].amount })
      });
      if (!response.ok) {
        throw new Error('Failed to add goal');
      }
      const data = await response.json();
      console.log('Goal added:', data);
      // Optionally, update the UI or fetch the updated list of goals from the server
    } catch (error) {
      console.error('Error adding goal:', error.message);
      // Handle error (e.g., show error message to user)
    }
  };
  
  
  const handleDeleteGoal = (index) => {
    setGoals([{ name: '', amount: '' }])
  }
  
  const handleGoalAmountChange = (index, amount) => {
    const newGoal = { name: goals[0].name, amount: amount }
    setGoals([newGoal])
  }
  
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 dark:bg-gray-800">
      <h1 className="font-semibold text-3xl text-white mb-8">
        Set Your Financial Goal
      </h1>
      <div className="flex flex-col items-center w-3/4">
        <FinancialGoal goal={goals[0]} handleGoalAmountChange={handleGoalAmountChange} handleDeleteGoal={handleDeleteGoal} />
        <AddGoalForm newGoal={goals[0].name} newAmount={goals[0].amount} handleAddGoal={handleAddGoal} setNewGoal={(value) => setGoals([{ name: value, amount: goals[0].amount }])} setNewAmount={(value) => setGoals([{ name: goals[0].name, amount: value }])} />
      </div>
    </div>
  )
}


export default GoalPage;

