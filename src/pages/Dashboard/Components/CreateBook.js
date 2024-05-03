import React, { useState } from 'react';

function CreateBook() {
  const [book, setBook] = useState({ title: '', author: '' });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    // Handle creating a new book
    console.log('New book created:', book);
    setBook({ title: '', author: '' });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Create a New Book</h3>
      <input
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="Book Title"
        className="p-2 border rounded mb-2"
      />
      <input
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="Book Author"
        className="p-2 border rounded mb-2"
      />
      <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </div>
  );
}

export default CreateBook;
