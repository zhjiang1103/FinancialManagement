import React from 'react'

export default function SelectStatus({ value, onChange }) {
  return (
    <div>

        <select style={{ color: "black" }} value={value} onChange={onChange}>
            <option value="" disabled> select a status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="checked-out">Checked Out</option>
        </select>
      
    </div>
  )
}