const EventEmitter = require("event");

const emitter = new EventEmitter();

emitter.on("userLogin", (user) => {
  console.log(`User logged in`);
});

emitter.on("dataFetched", () => {
  console.log("Users data fetched");
});

module.exports = emitter;
