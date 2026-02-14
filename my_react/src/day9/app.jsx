import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BookPage from "./BookPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
