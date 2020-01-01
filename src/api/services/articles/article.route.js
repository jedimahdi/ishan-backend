const express = require('express');
const validate = require('express-validation');
const controller = require('./article.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { listArticles } = require('./article.validation');

const router = express.Router();

router.param('articleId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/articles List Articles
   * @apiDescription Get a list of articles
   * @apiVersion 1.0.0
   * @apiGroup Article
   * @apiPermission public
   *
   * @apiSuccess {Object[]} articles List of articles.
   *
   */

  .get(validate(listArticles), controller.list)
  /**
   * @api {post} v1/articles Create Article
   * @apiDescription Create a new article
   * @apiName CreateArticle
   * @apiVersion 1.0.0
   * @apiGroup Article
   * @apiPermisson admin
   *
   * @apiHeader {String} Authroziation User's access token
   *
   * @apiParam {String}         title     Article's title
   * @apiParam {String}         text      Article's text
   * @apiParam {File}           file      Article's image
   *
   * @apiSuccess (Created 201) {String}   id        Article's id
   * @apiSuccess (Created 201) {String}   title     Article's title
   * @apiSuccess (Created 201) {String}   text      Article's title
   * @apiSuccess (Created 201) {String}   image     Article's image
   * @apiSuccess (Created 201) {Date}     createdAt Timestamp
   *
   * @apiError (Bad Request 400) ValidationError   Some parameters may contain invalid values
   * @apiError (Unauthorized 401) ValidationError  Only authenticated users can create the data
   */
  .post(authorize(), controller.create);

router
  .route('/:articleId')
  /**
   * @api {get} v1/articles/:id Get Article
   * @apiDescription Get article information
   * @apiVersion 1.0.0
   * @apiName GetArticle
   * @apiGroup Article
   * @apiPermisson public
   *
   * @apiSuccess {String} id      Article's id
   * @apiSuccess {String} title   Article's title
   * @apiSuccess {String} text    Article's text
   * @apiSuccess {Date} createdAt createdAt
   */
  .get(controller.get)
  .patch(controller.update)
  .delete(controller.remove);

module.exports = router;
