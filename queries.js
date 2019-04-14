const Pool = require('pg').Pool
const httpBuildQuery = require('http-build-query');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'simplepassword',
  port: 3333,
});

const getRecipeNames = (req, res) => {
  pool.query('SELECT "recipe_name" FROM recipe_master', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getMasterRecipe = (req, res) => {
  const name = '%' + String(req.params.name) + '%';
  pool.query(
    "SELECT * FROM recipe_master INNER JOIN levels ON levels.id=recipe_master.level_id INNER JOIN personas ON personas.id=recipe_master.persona_id where recipe_master.recipe_name ILIKE $1",
    [name],
    (error, results) => {
      if (error) {
        throw error
      }

    res.status(200).json(results.rows)
  })
}

const getSurveyResults = (req, res) => {
  const cost = parseInt(req.params.cost);
  const cookTime = parseInt(req.params.cookTime);
  const restriction = parseInt(req.params.restriction);

  pool.query(
    "SELECT recipe_name, image_url FROM recipe_master WHERE recipe_master.cost >= $1 AND recipe_master.cooktime <= $2 AND restrictions_id = $3",
    [cost, cookTime, restriction],
    (error, results) => {
      if (error) {
        throw error
      }

    res.status(200).json(results.rows)
  })
}

const getRecipeIngredients = (req, res) => {
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
        throw error
      }

    res.status(200).json(results.rows)
  })
}

const getRecipeNames = (req, res) => {
    pool.query('SELECT recipe_name, image_url FROM recipe_master', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {
    getRecipeNames,
    getMasterRecipe,
    getSurveyResults,
    getRecipeIngredients
}