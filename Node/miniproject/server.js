const http = require("http");
const router = require("./router");

const PORT = 3000;

const server = http.createServer((req, res) => {

    router(req, res);
  
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
