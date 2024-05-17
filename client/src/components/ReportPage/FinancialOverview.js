import Chart1 from "./chart";

const FinancialOverview = ({totalIncome, totalExpense, totalSavings, selectedMonth, selectedYear}) => {
    const chartData = [totalIncome, totalExpense, totalSavings]
    return (
      <div className="bg-dark rounded-lg shadow-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Financial Overview - {selectedMonth} {selectedYear}
        </h2>
        <div className="w-64 h-64 mx-auto"> 
            <Chart1 data={chartData} />
        </div>
      </div>
    )
  }

  export default FinancialOverview;