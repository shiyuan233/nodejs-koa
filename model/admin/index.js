const fs = require('fs')
const mysql2 = require('mysql2')
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: 'world'
})
module.exports = {
  addData: async (request) => {
    let {
      title,
      type
    } = request.body
    if (request.files.img.size > 0) {
      // 有图片上传
      if (!fs.existsSync('static/upload')) {
        fs.mkdirSync('static/upload')
      }
      const path = request.files.img.path
      const name = request.files.img.name.split('.')[0] + new Date().getTime() + '.' + request.files.img.name.split('.')[1];
      let res = fs.readFileSync(path)
      const filePath = '/upload/' + name
      fs.writeFileSync(`static/upload/${name}`, res)
      const time = new Date().getFullYear()
      let [row] = await connection.promise().query('INSERT INTO news (title,img,tag,time) VALUES(?,?,?,?)', [title, filePath, type, time])
      return row
    }
  },
  getData: async (payload) => {
    const {
      pageNum,
      pageSize
    } = payload
    let [rows] = await connection.promise().query(`SELECT * FROM news LIMIT ${(pageNum-1)*pageSize},${pageSize}`)
    return rows
  },
  getTotal: async (pageSize) => {
    let [rows] = await connection.promise().query('SELECT * FROM news');
    return Math.ceil(rows.length / pageSize)
  },
  delete:async (id)=>{
    let [rows] = await connection.promise().query('DELETE FROM news WHERE id = ?',[id])
    return rows
  }
}