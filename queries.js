const { Pool, Client } = require('pg');
const vars = require('./variables.js');
const R = require('ramda');

const pool = vars.devPool;

const getRecipeNames = (req, res) => {
  pool.query('SELECT id, recipe_name, image_url FROM recipe_master', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getMasterRecipe = (req, res) => {
  if (typeof req.params.name !== 'string') {
    res.status(401).send(`Error in request params`);
    return;
  }
  
  const name = '%' + String(req.params.name) + '%';
  pool.query(
    "SELECT * FROM recipe_master INNER JOIN levels ON levels.id=recipe_master.level_id INNER JOIN personas ON personas.id=recipe_master.persona_id where recipe_master.recipe_name ILIKE $1", [name])
  .then((data) => {
    console.log('request from: ', req.url);
    res.status(200).json(data.rows);
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  })
}

const getSurveyResults = (req, res) => {
  if (isNaN(req.params.cost) === true || isNaN(req.params.cookTime) === true || isNaN(req.params.restriction) === true) {
    res.status(401).send(`Error in request params`);
    return;
  }
  
  const cost = parseInt(req.params.cost);
  const cookTime = parseInt(req.params.cookTime);
  const restriction = parseInt(req.params.restriction);

  pool.query(
    "SELECT id, recipe_name, image_url FROM recipe_master WHERE recipe_master.cost >= $1 AND recipe_master.cooktime <= $2 AND restrictions_id = $3",
    [cost, cookTime, restriction],
    (error, results) => {
      if (error) {
        throw error
      }
    
    console.log(vars.logTime, req.url);
    res.status(200).json(results.rows)
  })
}

const getRecipeIngredients = (req, res, next) => {
  console.log(vars.logTime, req.url);
  if (isNaN(req.params.id) === true) {
    return next(res.status(401).send(`Error in request params`));
  }

  const id = parseInt(req.params.id);

  pool.query(
    `SELECT quantity,ingredient,measurement,technique FROM ingredient_list 
    INNER JOIN ingredients ON ingredient_list.ingredient_id=ingredients.id 
    INNER JOIN measurements ON ingredient_list.measurement_id=measurements.id
    LEFT JOIN techniques ON ingredient_list.technique_id=techniques.id
    WHERE recipe_id = $1`,
    [id],
    (error, results) => {
      if (error) {
        console.log('Dad is the worst');
        throw error
      }
    res.status(200).json(results.rows)
  })
}

const getPersonas = (req, res, next) => {
  pool.query(
    `SELECT * FROM personas WHERE chars IS NOT NULL`,
    (error, results) => {
      if (error) {
        throw error
      }

    console.log(vars.logTime, req.url);
    res.status(200).json(results.rows)
  })
}

const addVote = (req, res, next) => {
  if (isNaN(req.params.id) === true) {
    return next(res.status(401).send(`Error in request params`));
  }

  const id = parseInt(req.params.id);
  pool.query(
    `UPDATE recipe_master
    SET upvotes = upvotes + 1
    WHERE recipe_master.id=$1
    RETURNING id, recipe_name, upvotes
    `,
    [id],
    (error, results) => {
      if (error) {
        throw error
      }

    console.log(vars.logTime, req.url);
    res.status(200).json(results.rows[0])
  })
}

const removeVote = (req, res, next) => {
  if (isNaN(req.params.id) === true) {
    return next(res.status(401).send(`Error in request params`));
  }

  const id = parseInt(req.params.id);
  pool.query(
    `UPDATE recipe_master
    SET upvotes = upvotes - 1
    WHERE recipe_master.id=$1
    RETURNING id, recipe_name, upvotes
    `,
    [id],
    (error, results) => {
      if (error) {
        throw error
      }

    console.log(vars.logTime, req.url);
    res.status(200).json(results.rows[0])
  })
}

const getPersonaSpecificRecipes = (req, res, next) => {
  console.log(vars.logTime, req.url); 
  if (isNaN(req.params.personaId) === true) {
    return next(res.status(401).send(`Error in request params`));
  }

  const personaId = parseInt(req.params.personaId);

  pool.query(
    `SELECT recipe_master.id, recipe_name, image_url, restrictions FROM recipe_master 
    LEFT JOIN restrictions ON recipe_master.restrictions_id=restrictions.id
    WHERE persona_id=$1`,
    [personaId],
    (error, results) => {
      if (error) {
        throw error
      }

    res.status(200).json(results.rows);
  })
}

module.exports = {
    getRecipeNames,
    getMasterRecipe,
    getSurveyResults,
    getRecipeIngredients,
    getPersonas,
    getPersonaSpecificRecipes,
    addVote,
    removeVote,
}
