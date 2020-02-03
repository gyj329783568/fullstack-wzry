module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')


  const Category = require('../../models/Category')
  const Article = require('../../models/Article')

  //const Article = mongoose.model('Article', null)
  router.get('/news/init', async(req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().lean().where({
      parent: parent
    })
    const newsTitles = ["王者荣耀祝各位召唤师春节快乐！", "《王者荣耀》获App store推荐，带你领略五岳东方之美！", "1月24日全服不停机更新公告", "贺鼠年新春 领多重好礼！", "【已修复】妲己时之彼端皮肤分享周边商城优惠券异常问题", "王者荣耀祝各位召唤师春节快乐！", "《王者荣耀》获App store推荐，带你领略五岳东方之美！", "1月24日全服不停机更新公告", "贺鼠年新春 领多重好礼！", "【已修复】妲己时之彼端皮肤分享周边商城优惠券异常问题", "王者荣耀祝各位召唤师春节快乐！", "《王者荣耀》获App store推荐，带你领略五岳东方之美！", "1月24日全服不停机更新公告", "贺鼠年新春 领多重好礼！", "【已修复】妲己时之彼端皮肤分享周边商城优惠券异常问题"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => {
        Math.random() - 0.5
      })
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()

    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      {$match: {parent: parent._id}},
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },{
        $addFields: {
          newsList: {$slice: ['$newsList', 5]}
        }
      }
    ])

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: {$in: subCats}
      }).populate('categories').limit(5).lean()
    })
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
        return news
      })
      return cats
    })

    res.send(cats)
  })

  app.use('/web/api' ,router)
}