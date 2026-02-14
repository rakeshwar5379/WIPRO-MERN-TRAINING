const listeners = [];

const Dispatcher = {
  register(callback) {
    listeners.push(callback);
  },

  dispatch(action) {
    listeners.forEach(listener => listener(action));
  }
};

export default Dispatcher;
