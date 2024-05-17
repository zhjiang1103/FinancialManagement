import { useState } from "react"

const MonthSelector = ({ handleMonthChange, handleYearChange }) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const years = [2024, 2025, 2026, 2027, 2028]
    const [selectedMonth, setSelectedMonth] = useState('January')
    const [selectedYear, setSelectedYear] = useState(2024)
  
    const handleMonthSelect = (e) => {
      setSelectedMonth(e.target.value)
      handleMonthChange(e.target.value)
    }
  
    const handleYearSelect = (e) => {
      setSelectedYear(parseInt(e.target.value))
      handleYearChange(parseInt(e.target.value))
    }
  
    return (
      <div className="flex justify-center items-center mb-4">
        <div className="mr-8">
          <label htmlFor="month-select" >Month:</label>
          <select
            className="text-black ml-4 border rounded-md p-2"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthSelect}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year-select">Year:</label>
          <select
            className="text-black ml-4 border rounded-md p-2"
            id="year-select"
            value={selectedYear}
            onChange={handleYearSelect}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
  
export default MonthSelector;