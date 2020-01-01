const InsComment = require('./instructor_comment.model');

exports.get = async id => InsComment.findById(id);
/**
 * Get article list
 * @pulbic
 */
exports.list = async params => {
  try {
    const comments = await InsComment.list(params);
    return comments;
  } catch (error) {
    throw error;
  }
};

exports.create = async (commentData, commetnImage) => {
  try {
    const comment = new InsComment({
      ...commentData,
      image: commetnImage.filename
    });
    const savedComment = await comment.save();
    return savedComment;
  } catch (error) {
    throw error;
  }
};

exports.update = async (comment, updatedData) => {
  try {
    const updatedComment = Object.assign(comment, updatedData);
    const savedComment = await updatedComment.save();
    return savedComment;
  } catch (error) {
    throw error;
  }
};

exports.remove = async comment => comment.remove();
