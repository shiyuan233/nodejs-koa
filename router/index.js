const newsRouter = require('./news/index')
const adminRouter = require('./admin/index')
const Router = require('koa-router')
const router = new Router()
router.get('/', ctx => {
  ctx.redirect('./news')
})
module.exports = (app) => {
  app.use(router.routes())
  app.use(newsRouter.routes())
  app.use(adminRouter.routes())
}