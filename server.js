const express = require('express');
const app = express();
const port = 3333;

var pgp = require('pg-promise');
const db = require('./queries');
const bodyParser = require('body-parser');

// bodyParser middleware to help parse JSON
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route

app.get('/ingredients', db.getIngredients);
app.get('/ingredients/:id', db.getIngredients);

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/express_backend', (req, res) => {
  res.send({ express: '✅ Express server connected' });
});

app.get('/allrecipes', (req, res) => {
    res.send({ express: 'Here are all the recipes' });
  });