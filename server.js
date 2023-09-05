const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Middleware for parsing JSON requests
app.use(express.json());

// Load routes from the routes/index.js file
const routes = require('./routes');

// Use the routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
