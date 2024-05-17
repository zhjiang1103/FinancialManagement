const TotalSection = ({totalIncome, totalExpenses, totalSavings}) => {
    const formatCurrency = (amount) => {
        return `$${amount.toFixed(2)}`
      }
      
      const TotalItem = ({ label, amount }) => {
        return (
          <div className="flex justify-between">
            <p>{label}:</p>
            <p>{formatCurrency(amount)}</p>
          </div>
        )
      }
    return (
      <div className="flex flex-col">
        <TotalItem label="Total Income" amount={totalIncome} />
        <TotalItem label="Total Expenses" amount={totalExpenses} />
        <TotalItem label="Total Savings" amount={totalSavings} />
      </div>
    )
  }

  export default TotalSection;