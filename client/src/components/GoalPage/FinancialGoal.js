import React, { useState } from 'react'
import { HiCheckCircle, HiXCircle } from 'react-icons/hi'

const FinancialGoal = ({ goal, handleGoalAmountChange, handleDeleteGoal }) => {
  return (
    <div className="flex justify-between items-center my-4 bg-white rounded-lg shadow-md p-4 dark:bg-gray-700">
      <div className="flex items-center">
        <HiCheckCircle className="text-green-500 mr-4" />
        <p className="font-bold text-xl text-black">{goal.name}</p>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-500">{}</span>
        <input type="number" min="0" step="0.01" value={goal.amount} onChange={(e) => handleGoalAmountChange(0, e.target.value)} className="text-black w-32 p-2 border border-gray-400 rounded" />
        <HiXCircle className="text-red-500 cursor-pointer" onClick={() => handleDeleteGoal(0)} />
      </div>
    </div>
  )
}

export default FinancialGoal;