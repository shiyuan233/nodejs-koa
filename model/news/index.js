const mysql2 = require('mysql2')
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: 'world'
})

module.exports = {
  async getData(page, pageSize) {
    let [row] = await connection.promise().query(`SELECT * FROM news LIMIT ${(page-1)*pageSize},${pageSize}`)
    return row
  },
  async getTotal(){
    let [row] = await connection.promise().query(`SELECT * FROM news`)
    return row.length
  }
}