import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Withload from "./withload";
import MessageBox from "./MessageBox";

function HomePage({ showLoading }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  showLoading(books.length === 0);

  return (
    <div>
      <MessageBox>
        {(text) => <p>{text}</p>}
      </MessageBox>

      {books.map((book) => (
        <div key={book.id}>
          <Link to={`/book/${book.id}`}>{book.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Withload(HomePage);
