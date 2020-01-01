const Joi = require('joi');

module.exports = {
  listArticles: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      title: Joi.string()
    }
  }
};
