import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';


const BookForm = ({title, setTitle, author, setAuthor, description, setDescription, handleAddBook, editingIndex, handleSaveBook, handleCancelEdit, image, setImage, catalog, setCatalog}) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const catalogs = ['Fiction', 'Non-fiction', 'Mystery', 'Romance', 'Sci-fi', 'Other'];
  
    return (
      <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">{editingIndex === -1 ? 'Add a Book' : 'Edit Book'}</h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="title" className="mb-2 font-semibold text-white">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-400 rounded-lg py-2 px-3 bg-gray-100 text-gray-900" />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="author" className="mb-2 font-semibold text-white">Author</label>
        <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="border border-gray-400 rounded-lg py-2 px-3 bg-gray-100 text-gray-900" />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="description" className="mb-2 font-semibold text-white">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-400 rounded-lg py-2 px-3 bg-gray-100 text-gray-900"></textarea>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="image" className="mb-2 font-semibold text-white">Image</label>
        <input type="file" id="image" onChange={handleImageUpload} className="border border-gray-400 rounded-lg py-2 px-3" />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="catalog" className="mb-2 font-semibold text-white">Catalog</label>
        <select id="catalog" value={catalog} onChange={(e) => setCatalog(e.target.value)} className="border border-gray-400 rounded-lg py-2 px-3 bg-gray-100 text-gray-900">
          {catalogs.map((catalog) => (
            <option key={catalog} value={catalog}>{catalog}</option>
          ))}
        </select>
      </div>
      {editingIndex === -1 ? (
        <button onClick={handleAddBook} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
          <FaPlus className="mr-2" />
          Add Book
        </button>
      ) : (
        <div className="flex">
          <button onClick={handleSaveBook} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center mr-2">
            <FaPlus className="mr-2" />
            Save
          </button>
          <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
export default BookForm;