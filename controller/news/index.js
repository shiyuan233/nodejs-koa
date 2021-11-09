// 新闻逻辑
const newsModal = require('../../model/news/index')
const koaBody = require('koa-body')
module.exports = {
  redirect: ctx => {
    ctx.redirect('/news/index')
  },
  index: async ctx => {
    const page = parseInt(ctx.query.p) || 1
    const pageSize = 5;
    let res = await newsModal.getData(page, pageSize)
    let total = await newsModal.getTotal()
    await ctx.render('./news/index.pug', {
      data: res,
      total: Math.ceil(total/pageSize),
      page,

    })
  }
}