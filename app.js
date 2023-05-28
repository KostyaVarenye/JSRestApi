const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

// Middleware function
const middleware = (req, res, next) => {
  console.log('Hello from middleware');
  next(); // Call next() to proceed to the next middleware or route handler
};

app.use(middleware); // Adding the middleware function here

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
