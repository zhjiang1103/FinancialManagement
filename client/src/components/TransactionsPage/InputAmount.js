
const InputAmount = ({ type, placeholder, name, value, onChange }) => {
  return (
    <input
      className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}
export default InputAmount;