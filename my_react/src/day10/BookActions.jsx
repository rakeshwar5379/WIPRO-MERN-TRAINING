import Dispatcher from "../dispatcher/Dispatcher";

export const addbook = (bookData) => {
  Dispatcher.dispatch({
    type: "ADD_BOOK",
    payload: bookData
  });
};
