import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import MonthSelector from './MonthSelector';
import TotalSection from './TotalSection';
import RatioSection from './RatioSection';
import ProgressSection from './ProgressSection';
import FinancialOverview from './FinancialOverview';



const ReportPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const [selectedMonth, setSelectedMonth] = useState('January')
  const [selectedYear, setSelectedYear] = useState(2024)
  const [transactions, setTransactions] = useState([]);
  const [goalAmount, setGoalAmount] = useState();

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
  }

  const handleYearChange = (year) => {
    setSelectedYear(year)
  }

  useEffect(() => {
    const fetchTransactions = async (email) => {
        try {
            const response = await fetch(`/api/transactions/${email}`);

            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }

            const data = await response.json();
            setTransactions(data);
            console.log(data)
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    fetchTransactions(user.email);
}, []); 

useEffect(() => {
  const fetchGoalAmount = async (email) => {
      try {
          const response = await fetch(`/api/goal/${email}`);

          if (!response.ok) {
              throw new Error('Failed to fetch transactions');
          }

          const data = await response.json();
          setGoalAmount(data[0].amount);
          console.log(data[0].amount)
      } catch (error) {
          console.error(error);
          // Handle error
      }
  };

  fetchGoalAmount(user.email);
}, []); 


const totalExpense = transactions
  .filter(transaction => transaction.type === 'expense' && transaction.month === selectedMonth && transaction.year === selectedYear)
  .reduce((total, transaction) => total + transaction.amount, 0);

const totalIncome = transactions
  .filter(transaction => transaction.type === 'income' && transaction.month === selectedMonth && transaction.year === selectedYear)
  .reduce((total, transaction) => total + transaction.amount, 0);

const totalSavings = transactions
  .filter(transaction => transaction.type === 'savings' && transaction.month === selectedMonth && transaction.year === selectedYear)
  .reduce((total, transaction) => total + transaction.amount, 0);

console.log('Total Expense:', totalExpense);
console.log('Total Income:', totalIncome);
console.log('Total Savings:', totalSavings);


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-8">
        Insights and Reports
      </h1>

      <MonthSelector
        handleMonthChange={handleMonthChange}
        handleYearChange={handleYearChange}
      />

      <div className="bg-dark rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-3xl font-semibold mb-4">
          Expense and Income - {selectedMonth} {selectedYear}
        </h2>

        <TotalSection totalIncome={totalIncome} totalExpenses={totalExpense} totalSavings={totalSavings} />

        <RatioSection totalExpenses={totalExpense} totalIncome={totalIncome} totalSavings={totalSavings} />

      </div>

      <div className="bg-dark rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Progress Towards Financial Goal - {selectedMonth} {selectedYear}
        </h2>

        <ProgressSection totalSavings={totalSavings} goalAmount={goalAmount} />
      </div>
      <FinancialOverview totalIncome={totalIncome} totalExpenses={totalExpense} totalSavings = {totalSavings} selectedMonth={selectedMonth} selectedYear={selectedYear} />
    </div>
  )
}


export default ReportPage;