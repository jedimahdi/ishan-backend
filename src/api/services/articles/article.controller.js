const httpStatus = require('http-status');
const service = require('./article.service');
const settingService = require('../settings/settings.service');
const Setting = require('../settings/settings.model');
const { handler: errorHandler } = require('../../middlewares/error');
const multer = require('multer');
const path = require('path');

exports.load = async (req, res, next, id) => {
  try {
    const article = await service.get(id);
    req.locals = { article };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

exports.get = (req, res) => {
  res.json(req.locals.article);
};

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
    cb(null, path.join(__dirname, '../../../../public/articles'));
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
      // return res.status(200).send(req.file);
      const response = await service.create(req.body, req.file, req.user.name);
      return res.status(httpStatus.CREATED).json(response);
    });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { article } = req.locals;
    const response = await service.update(article, req.body);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { article } = req.locals;

    // delete articles from settings
    const homepage_articles = await Setting.findOne({
      key: 'homepage_articles'
    });
    const articles = homepage_articles.value.split(',');
    const new_articles = articles.filter(a => a != article._id).join(',');
    await Setting.updateOne(
      {
        key: 'homepage_articles'
      },
      { $set: { value: new_articles } }
    );

    // delete article
    await service.remove(article);
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
