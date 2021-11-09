const Koa = require('koa')
const koaViews = require('koa-views')
const static = require('koa-static')
const koaBody = require('koa-body')
const route = require('./router/index')
const app = new Koa()
// 配置视图 模板配置
app.use(koaViews(__dirname + '/views'), {
  map: {
    html: 'pug'
  }
})
// 配置静态文件
app.use(static(__dirname + '/static'))
// 开启文件上传
app.use(koaBody({
  multipart: true
}))
// 路由
route(app)


app.listen(8888)