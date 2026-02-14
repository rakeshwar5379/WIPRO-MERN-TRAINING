import Dispatcher from "./Dispatcher";

class Bookstore {
  constructor() {
    this.Booklist = [];
    this.subscribers = [];

    Dispatcher.register(this.handleAction.bind(this));
  }

  handleAction(action) {
    if (action.type === "ADD_BOOK") {
      this.Booklist.push(action.payload);
      this.notify();
    }
  }

  getBooks() {
    return this.Booklist;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb());
  }
}

const Bookstore = new Bookstore();
export default Bookstore;
