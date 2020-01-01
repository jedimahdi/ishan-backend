const Article = require('./article.model');

exports.get = async id => Article.findById(id);
/**
 * Get article list
 * @pulbic
 */
exports.list = async params => {
  try {
    const articles = await Article.list(params);
    return articles;
  } catch (error) {
    throw error;
  }
};

exports.create = async (articleData, articleImage, username) => {
  try {
    const article = new Article({
      ...articleData,
      image: articleImage.filename,
      author: username
    });
    const savedArticle = await article.save();
    return savedArticle;
  } catch (error) {
    throw error;
  }
};

exports.update = async (article, updatedData) => {
  try {
    const updatedArticle = Object.assign(article, updatedData);
    const savedArticle = await updatedArticle.save();
    return savedArticle;
  } catch (error) {
    throw error;
  }
};

exports.remove = async article => article.remove();
