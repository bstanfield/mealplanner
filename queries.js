const Pool = require('pg').Pool
const httpBuildQuery = require('http-build-query');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'simplepassword',
  port: 3333,
})

const getIngredients = (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
      pool.query('SELECT * FROM ingredients WHERE id=$1',
      [id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows);
      })
    }
  }

module.exports = {
    getIngredients,
}