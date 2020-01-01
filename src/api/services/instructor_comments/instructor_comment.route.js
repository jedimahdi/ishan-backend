const express = require('express');
const validate = require('express-validation');
const controller = require('./instructor_comment.controller');
const { listArticles } = require('./instructor_comment.validation');

const router = express.Router();

router.param('commentId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/articles List Articles
   * @apiDescription Get a list of articles
   * @apiVersion 1.0.0
   * @apiGroup Article
   * @apiPermission public
   *
   */

  .get(controller.list)
  .post(controller.create);

router
  .route('/:commentId')
  .get(controller.get)
  .patch(controller.update)
  .delete(controller.remove);

module.exports = router;
