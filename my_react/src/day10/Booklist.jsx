import React, { useEffect, useState } from "react";
import Bookstore from "../store/Bookstore";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const updatebooks = () => {
      setBooks([...Bookstore.getBooks()]);
    };

    bookStore.subscribe(updatebooks);
    updatebooks();
  }, []);

  return (
    <div>
      <h2>Book Collection</h2>

      {books.length === 0 && <p>No books added yet</p>}

      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} - {book.author} - ₹{book.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Booklist;
