const express = require('express');
const validate = require('express-validation');
const controller = require('./settings.controller');

const router = express.Router();

router.param('settingId', controller.load);

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .patch(controller.update);

router.route('/init').get(controller.initial);
router.route('/:settingId').delete(controller.remove);

module.exports = router;
