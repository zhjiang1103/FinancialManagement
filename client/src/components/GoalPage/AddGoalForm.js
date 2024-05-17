const AddGoalForm = ({ newGoal, newAmount, handleAddGoal, setNewGoal, setNewAmount }) => {
    return (
      <div className="flex items-center mb-4">
        <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} className="text-black w-64 mr-4 p-2  border border-gray-400 rounded" />
        <input type="number" min="0" step="0.01" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="text-black w-32 mr-4 p-2 border border-gray-400 rounded" />
        <button onClick={handleAddGoal} className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600">
          Add Goal
        </button>
      </div>
    )
  }

  export default AddGoalForm;