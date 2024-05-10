import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineQuestion } from 'react-icons/ai';


const Book = ({book, index, handleEditBook, handleDeleteBook}) => {
    return (
      <div key={index} className="bg-gray-900 rounded-lg shadow-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4 text-white">{book.title}</h2>
      <img src={book.image} alt={book.title} className="mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-white">Author</h3>
      <p className="mb-4 text-gray-300">{book.author}</p>
      <h3 className="text-lg font-semibold mb-2 text-white">Description</h3>
      <p className="mb-4 text-gray-300">{book.description}</p>
      <h3 className="text-lg font-semibold mb-2 text-white">Categories</h3>
      <p className="mb-4 text-gray-300">{book.categories === 'Other' ? <AiOutlineQuestion className="inline-block mr-2" /> : null}{book.categories}</p>
      <div className="flex justify-end">
        <button onClick={() => handleEditBook(index)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center mr-2">
          <FaEdit className="mr-2" />
          Edit
        </button>
        <button onClick={() => handleDeleteBook(index)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
          <FaTrash className="mr-2" />
          Delete
        </button>
      </div>
    </div>
    );
  }

export default Book;