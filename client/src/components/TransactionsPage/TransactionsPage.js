import InputAmount from './InputAmount';
import SelectType from './SelectType';
import TransactionRow from './TransactionRow';
import MonthSelector from '../ReportPage/MonthSelector';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa'
import { useAuth0 } from "@auth0/auth0-react";


const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'savings', amount: 500 },
    { id: 2, type: 'expense', amount: 2500 },
    { id: 3, type: 'income', amount: 1000 },
  ])
  const [selectedMonth, setSelectedMonth] = useState('January')
  const [selectedYear, setSelectedYear] = useState(2024)
  const [newTransaction, setNewTransaction] = useState({ type: '', amount: '' })
  const [editing, setEditing] = useState(false)
  const [editTransactionData, setEditTransactionData] = useState({ id: null, type: '', amount: '' })
  const { isAuthenticated, user } = useAuth0();

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewTransaction({ ...newTransaction, [name]: value })
  }

  const handleEditInputChange = (event) => {
    const { name, value } = event.target
    setEditTransactionData({ ...editTransactionData, [name]: value })
  }


    const addTransaction = async () => {
      try {
          const response = await fetch('/api/transactions', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: user.email, 
                type: newTransaction.type,
                amount: newTransaction.amount,
                month: selectedMonth,
                year: selectedYear
            })
          });
  
          if (!response.ok) {
              throw new Error('Failed to add transaction');
          }
  
          const data = await response.json();
          const id = transactions.length + 1
          setTransactions([...transactions, { id, ...newTransaction }]);
          setNewTransaction({ type: '', amount: '' });
          console.log('transaction added:', data);
      } catch (error) {
          console.error(error);
          // Handle error
      }
  }

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id)
    setTransactions(updatedTransactions)
  }

  const startEditing = (transaction) => {
    setEditing(true)
    setEditTransactionData(transaction)
  }

  const updateTransaction = () => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editTransactionData.id ? editTransactionData : transaction
    )
    setTransactions(updatedTransactions)
    setEditing(false)
    setEditTransactionData({ id: null, type: '', amount: '' })
  }

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
  }

  const handleYearChange = (year) => {
    setSelectedYear(year)
  }

  return (
  <div className="bg-gray-800">
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-3xl">
        <h1 className="font-semibold text-4xl mb-8">Transaction Management</h1>
        <div className="flex-col items-center mb-8">
          
          <MonthSelector handleMonthChange={handleMonthChange} handleYearChange={handleYearChange}/>
       
          <SelectType name="type" value={newTransaction.type} onChange={handleInputChange} />
          <InputAmount
            type="number"
            placeholder="Amount"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded ml-4"
            onClick={addTransaction}
          >
            <FaPlus className="inline-block mr-2"/>
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-lg">#</th>
              <th className="px-4 py-3 text-lg">Type</th>
              <th className="px-4 py-3 text-lg">Amount</th>
              <th className="px-4 py-3 text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onDelete={deleteTransaction}
                onStartEditing={startEditing}
              />
            ))}
          </tbody>
        </table>
        {editing && (
          <div className="flex items-center mt-8">
            <SelectType
              name="type"
              value={editTransactionData.type}
              onChange={handleEditInputChange}
            />
            <InputAmount
              type="number"
              placeholder="Amount"
              name="amount"
              value={editTransactionData.amount}
              onChange={handleEditInputChange}
            />
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded ml-4"
              onClick={updateTransaction}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default TransactionsPage;