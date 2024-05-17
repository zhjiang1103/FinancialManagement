

const SelectType = ({ name, value, onChange }) => {
  return (
    <select
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mr-2"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">Select Type</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
      <option value="savings">Savings</option>
    </select>
  )
}
export default SelectType;