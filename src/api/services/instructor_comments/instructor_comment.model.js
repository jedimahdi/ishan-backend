const mongoose = require('mongoose');
// const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');

/**
 * Article Schema
 * @private
 */
const insCommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    text: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

insCommentSchema.statics = {
  /**
   * List articles in descending order of 'createdAt' timestamp
   *
   * @param {number} page
   * @param {number} perPage
   * @param {string} name
   * @returns {Promise<Article[]>}
   */
  list({ page = 1, perPage = 30, name }) {
    const options = omitBy({ name }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }
};

/**
 * @typedef InsComment
 */
module.exports = mongoose.model('InsComment', insCommentSchema);
