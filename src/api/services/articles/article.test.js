const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const Article = require('./article.model');
const app = require('../../../index');

describe('Articles API', () => {
  let dbArticles;
  let myArticle;

  beforeEach(async () => {
    dbArticles = {
      mechKeyboard: {
        title: 'Mechanical Keyboard',
        text: 'lorem ipsum'
      }
    };

    myArticle = {
      title: 'Test',
      text: 'this is test'
    };

    await Article.remove({});
    await Article.insertMany([dbArticles.mechKeyboard]);
  });

  describe('GET /v1/articles', () => {
    it('should get all articles', () => {
      return request(app)
        .get('/v1/articles')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
        });
    });
  });

  // describe('POST /v1/articles', () => {
  //   it('should craete a new article when request is ok', () => {
  //     return request(app)
  //       .post('/v1/articles')
  //       .send(myArticle)
  //       .expect(httpStatus.CREATED)
  //       .then(res => {
  //         expect(res.body).to.include(myArticle);
  //       });
  //   });
  // });
});
