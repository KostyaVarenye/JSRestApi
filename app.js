const express = require('express');
const path = require('path');
const middleware = require('./middleware.mjs');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));



app.use(middleware); // Adding the middleware function here

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
