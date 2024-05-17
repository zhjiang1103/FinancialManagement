const RatioSection = ({totalExpenses, totalIncome, totalSavings}) => {
    const PercentageItem = ({ label, percentage }) => {
        return (
          <div className="flex justify-between">
            <p>{label}:</p>
            <p>{percentage.toFixed(0)}%</p>
          </div>
        )
      }
    
    const expenseRatio = totalExpenses / totalIncome
    const savingsRate = totalSavings / totalIncome
    return (
        <>
            <PercentageItem label="Expense Ratio" percentage={expenseRatio * 100} />
            <PercentageItem label="Savings Rate" percentage={savingsRate * 100} />
        </>
    )
}

export default RatioSection;