const UserSchema = require('../models/user');
const ArticleSchema = require('../models/articles');
module.exports = {createUser, updateUser, getUser, deleteUser, getUserArticles};

async function createUser(req, res, next) {
  const {body} = req;

  try {
    const user = await UserSchema.create(body);
    return res.json({user});
  } catch (e) {
    res.json(e);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await UserSchema.updateOne({_id: req.params.id}, req.body);
    res.json(user);
  } catch (e) {
    res.json(e);
  }
}

async function getUser(req, res, next) {
  try {
    let user = await UserSchema.find({_id: req.params.id});
    const articles = await ArticleSchema.find({owner: req.params.id});
    res.json({user, articles})
  } catch (e) {
    res.json(e);
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await UserSchema.deleteOne({_id: req.params.id});
    const articles = await ArticleSchema.deleteMany({owner: req.params.id});
    res.json(user);
  } catch (e) {
    res.json(e);
  }
}

async function getUserArticles(req, res, next) {
  try {
    const user = await ArticleSchema.find({owner: req.params.id});
    res.json(user);
  } catch (e) {
    res.json(e)
  }
}