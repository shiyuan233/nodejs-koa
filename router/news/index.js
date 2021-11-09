// 新闻页面 路由
const newsController = require('../../controller/news/index')
const Router = require('koa-router')
const router = new Router({
  prefix: '/news'
})
router.get('/', newsController.redirect)
router.get('/index', newsController.index)
module.exports = router