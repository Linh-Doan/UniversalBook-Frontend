import React, { useState, useEffect } from 'react';

function ViewCurrentBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch and set books data here
    // For now, let's use some mock data
    setBooks([
      { id: 1, title: 'Book Title 1', author: 'Author 1' },
      { id: 2, title: 'Book Title 2', author: 'Author 2' },
      // Add more mock books as needed
    ]);
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Current Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewCurrentBooks;
