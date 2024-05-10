import BookForm from './BookForm';
import Book from './Book';
import { useState } from 'react';




const MyLibrary = () => {
  const catalogs = ['Fiction', 'Non-fiction', 'Mystery', 'Romance', 'Sci-fi', 'Other'];
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [image, setImage] = useState('');
  const [catalog, setCatalog] = useState(catalogs[0]);

  const handleAddBook = () => {
    const newBook = { title, author, description, image, catalog };
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setDescription('');
    setImage('');
    setCatalog(catalogs[0]);
  };

  const handleDeleteBook = (index) => {
    const newBooks = [...books];
    newBooks.splice(index, 1);
    setBooks(newBooks);
  };

  const handleEditBook = (index) => {
    setEditingIndex(index);
    setTitle(books[index].title);
    setAuthor(books[index].author);
    setDescription(books[index].description);
    setImage(books[index].image);
    setCatalog(books[index].catalog);
  };

  const handleSaveBook = () => {
    const editedBook = { title, author, description, image, catalog };
    const newBooks = [...books];
    newBooks.splice(editingIndex, 1, editedBook);
    setBooks(newBooks);
    setTitle('');
    setAuthor('');
    setDescription('');
    setImage('');
    setCatalog(catalogs[0]);
    setEditingIndex(-1);
  };

  const handleCancelEdit = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setImage('');
    setCatalog(catalogs[0]);
    setEditingIndex(-1);
  };



  return (
    <>
  

  <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-white">My Library</h1>
      <BookForm
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        description={description}
        setDescription={setDescription}
        handleAddBook={handleAddBook}
        editingIndex={editingIndex}
        handleSaveBook={handleSaveBook}
        handleCancelEdit={handleCancelEdit}
        image={image}
        setImage={setImage}
        catalog={catalog}
        setCatalog={setCatalog}
      />
      <div className="w-full max-w-lg mt-8">
        {books.map((book, index) => (
          <Book
            key={index}
            book={book}
            index={index}
            handleEditBook={handleEditBook}
            handleDeleteBook={handleDeleteBook}
          />
        ))}
      </div>
    </div>

    </>

  );
};

export default MyLibrary;