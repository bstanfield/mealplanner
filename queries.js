const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'simplepassword',
  port: 3333,
});

const getIngredients = (req, res) => {
    pool.query('SELECT * FROM ingredients', (error, results) => {
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
    getIngredients,
    getRecipeNames,
}