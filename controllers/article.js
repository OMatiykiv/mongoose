const ArticleSchema = require('../models/articles');
const UserSchema = require('../models/user');
module.exports = {createArticle, updateArticle, getArticles, deleteArticle};

async function createArticle(req, res, next) {
    const {body} = req;
  
    try {
      if(await UserSchema.findOne({_id: req.body.owner})){
        const article = await ArticleSchema.create(body);
        const user = await UserSchema.updateOne({_id: req.body.owner}, {$inc: {numberOfArticles: 1}});
        return res.json({article});
      }
    } catch (e) {
      res.json(e);
    }
}

async function updateArticle(req, res, next) {
    try {
      
      if(await ArticleSchema.findOne({_id: req.params.id})){
        if(await UserSchema.findOne({_id: req.body.owner}) || !req.body.owner){
          if(req.body.owner){
            await UserSchema.updateOne({_id: req.body.owner}, {$inc: {numberOfArticles: 1}});
            const article = await ArticleSchema.findOne({_id: req.params.id});
            await UserSchema.updateOne({_id: article.owner}, {$inc: {numberOfArticles: -1}})
          }
          const article = await ArticleSchema.updateOne({_id: req.params.id}, {...req.body, updatedAt: Date.now()});
          res.json(article);
        }
      }
    } catch (e) {
      res.json(e);
    }
  }
  
  async function getArticles(req, res, next) {
    try {
      const article = await ArticleSchema.find(req.query).populate("owner");
      res.json(article);
    } catch (e) {
      res.json(e);
    }
  }
  
  async function deleteArticle(req, res, next) {
    try {
      const owner = await ArticleSchema.findOne({_id: req.params.id});
      const article = await ArticleSchema.deleteOne({_id: req.params.id});
      const user = await UserSchema.updateOne({_id: owner.owner}, {$inc: {numberOfArticles: -1}});
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  }