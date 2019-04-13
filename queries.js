const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'simplepassword',
  port: 3333,
})

const getIngredients = (req, res) => {
    pool.query('SELECT * FROM ingredients', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {
    getIngredients,
}