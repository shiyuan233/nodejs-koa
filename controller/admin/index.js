// 后台管理逻辑
const adminModal = require('../../model/admin/index')
module.exports = {
  index: ctx => {
    ctx.redirect('/admin/index')
  },
  adminPage: async ctx => {
    await ctx.render('./admin/index.pug')
  },
  add: async ctx => {
    await ctx.render('./admin/add.pug')
  },
  addData: async ctx => {
    let res = await adminModal.addData(ctx.request)
    let info = {}
    if (res.affectedRows > 0) {
      info = {
        code: 1,
        message: '操作成功'
      }
    } else {
      info = {
        code: 0,
        message: '操作失败'
      }
    }
    ctx.body = info
  },
  list: async ctx => {
    const pageNum = parseInt(ctx.query.pageNum) || 1;
    const pageSize = 5
    let res = await adminModal.getData({
      pageNum,
      pageSize
    })
    let total = await adminModal.getTotal(pageSize)
    await ctx.render('./admin/list.pug', {
      data: res,
      total,
      pageNum
    })
  },
  delete: async ctx => {
    let id = parseInt(ctx.query.id) || 1;
    let rows = await adminModal.delete(id)
    let res = {}
    if (rows.affectedRows > 0) {
      res = {
        info: '操作成功',
        code: 1
      }
    } else {
      res = {
        info: '操作失败',
        code: 0
      }
    }
    ctx.render('./admin/message.pug')
  }
}