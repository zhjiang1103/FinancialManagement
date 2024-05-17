import { FaEdit, FaTrash } from 'react-icons/fa'

const TransactionRow = ({ transaction, onDelete, onStartEditing }) => {
    return (
      <tr key={transaction.id}>
        <td className="border px-4 py-2 text-lg">{transaction.id}</td>
        <td className="border px-4 py-2 text-lg">{transaction.type}</td>
        <td className="border px-4 py-2 text-lg">{transaction.amount}</td>
        <td className="border px-4 py-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => onStartEditing(transaction)}
          >
            <FaEdit />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onDelete(transaction.id)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    )
  }

  export default TransactionRow;