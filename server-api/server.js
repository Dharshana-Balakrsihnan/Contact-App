const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Path to your JSON file
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use(cors());

// Use default middlewares (like static files)
server.use(middlewares);

// Set up your custom routes
server.use(router);

// Start server on port 3006
server.listen(3006, () => {
  console.log("JSON Server is running on http://localhost:3006");
});
