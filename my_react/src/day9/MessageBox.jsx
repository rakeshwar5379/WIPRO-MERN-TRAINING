function MessageBox({ children }) {
  const note = "Welcome to the book page";
  return children(note);
}

export default MessageBox;
