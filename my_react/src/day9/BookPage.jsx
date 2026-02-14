import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Withload from "./withload";

function BookPage({ showLoading }) {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/books/${bookId}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [bookId]);

  showLoading(!book);

  if (!book) return null;

  return (
    <div>
      <h3>{book.name}</h3>
      <p>{book.author}</p>
    </div>
  );
}

export default Withload(BookPage);
