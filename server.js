const express = require('express');
const app = express();
const vars = require('./variables.js');
require('dotenv').load();
const db = require('./queries');
const bodyParser = require('body-parser');
const cors = require('cors');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// bodyParser middleware to help parse JSON
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// just change to prodPort for production
const port = vars.devPort;

console.log(`Listening on port ${port}`);

app.use(cors());

// Confirms server is running in console
app.listen(port);

// TWILIO
app.post('/twilio/messages', (req, res) => {  
  res.header('Content-Type', 'application/json');
  client.messages
  .create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: req.body.to,
    body: `Hi there! \n You requested the recipe page for ${req.body.recipeName}: ${req.body.body}`
  })
  .then(() => {
    res.send(JSON.stringify({ success: true }));
  })
  .catch(err => {
    console.log(err);
    res.send(JSON.stringify({ success: false }));
  });
});

// Use this endpoint to get all persona names and characteristics
app.get('/personas', db.getPersonas);

// Use this endpoint to get all persona-specific recipes
app.get('/persona_recipes/:personaId', db.getPersonaSpecificRecipes);

// Use this endpoint to get all recipe names
app.get('/recipenames', db.getRecipeNames);

// This might not be useful
app.get('/ingredients/:id', db.getRecipeIngredients);

// Use this endpoint for primary recipe page
app.get('/survey_results/:cost/:cookTime/:restriction', db.getSurveyResults);

// Use this endpoint for primary recipe page
app.get('/master_recipes/:name', db.getMasterRecipe)

// --- POSTS ----
// Use this endpoint for upvoting a recipe
app.get('/upvote/:id', db.addVote)

app.get('/downvote/:id', db.removeVote)

// Standard messages
app.get('/', (req, res) => {
    console.log(`${vars.logTime}`, '/')
    res.json({ info: 'Node.js, Express, and Postgres API' })
})
