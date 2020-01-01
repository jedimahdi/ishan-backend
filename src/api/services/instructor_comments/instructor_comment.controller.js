const httpStatus = require('http-status');
const service = require('./instructor_comment.service');
const Setting = require('../settings/settings.model');
const { handler: errorHandler } = require('../../middlewares/error');
const multer = require('multer');
const path = require('path');

exports.load = async (req, res, next, id) => {
  try {
    const comment = await service.get(id);
    req.locals = { comment };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

exports.get = (req, res) => res.json(req.locals.comment);

/**
 * Get article list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const response = await service.list(req.query);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../../../public/comments'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage }).single('file');
exports.create = async (req, res, next) => {
  try {
    upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      const response = await service.create(req.body, req.file);
      return res.status(httpStatus.CREATED).json(response);
    });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { comment } = req.locals;
    const response = await service.update(comment, req.body);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { comment } = req.locals;

    // delete comment from settings
    const homepage_ins_comments = await Setting.findOne({
      key: 'homepage_instructor_comments'
    });
    const ins_comments = homepage_ins_comments.value.split(',');
    const new_ins_comments = ins_comments
      .filter(a => a != comment._id)
      .join(',');
    await Setting.updateOne(
      {
        key: 'homepage_instructor_comments'
      },
      { $set: { value: new_ins_comments } }
    );

    await service.remove(comment);
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
