/**
 * @file Represents the server file to connect the middleware
 */
const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

const PORT = 4000;
app.listen(PORT);
