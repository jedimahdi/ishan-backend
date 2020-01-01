const mongoose = require('mongoose');
// const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');

/**
 * Article Schema
 * @private
 */
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    text: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    author: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

articleSchema.statics = {
  /**
   * List articles in descending order of 'createdAt' timestamp
   *
   * @param {number} page
   * @param {number} perPage
   * @param {string} title
   * @returns {Promise<Article[]>}
   */
  list({ page = 1, perPage = 30, title }) {
    const options = omitBy({ title }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }
};

/**
 * @typedef Article
 */
module.exports = mongoose.model('Article', articleSchema);
