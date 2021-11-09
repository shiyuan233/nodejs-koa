// 后台管理系统路由文件
const Router = require('koa-router')
const adminController = require('../../controller/admin/index')

const router = new Router({
  prefix: '/admin'
})
router.get('/', adminController.index)
router.get('/index', adminController.adminPage)
router.get('/add',adminController.add)
router.post('/addData',adminController.addData)
router.get('/list',adminController.list)
router.get('/delete',adminController.delete)
module.exports = router