const httpStatus = require('http-status');
const service = require('./settings.service');
const fs = require('fs');
const path = require('path');
const Setting = require('./settings.model');
const { handler: errorHandler } = require('../../middlewares/error');

exports.load = async (req, res, next, id) => {
  try {
    const setting = await service.get(id);
    req.locals = { setting };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Create new settings
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const response = await service.create(req.body);
    return res.status(httpStatus.CREATED).json(response);
  } catch (error) {
    return next(error);
  }
};
/**
 * Update settings
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const response = await service.update(req.body);

    const settings = await service.list();
    const fields = ['key', 'value', 'readonly'];

    let transformedSettings = [];

    for (let setting of settings) {
      const transformed = {};
      fields.forEach(field => {
        transformed[field] = setting[field];
      });
      transformedSettings.push(transformed);
    }
    fs.writeFile(
      path.join(__dirname, '../../../seed/settings.json'),
      JSON.stringify(transformedSettings),
      err => {
        if (err) throw err;
        console.log('The file has been saved!');
      }
    );

    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const response = await service.list(req.query);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { setting } = req.locals;
    await service.remove(setting);
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

exports.initial = async (req, res, next) => {
  try {
    const init_settings = [
      {
        key: 'homepage_articles',
        value: '',
        readonly: true
      },
      {
        key: 'homepage_instructor_comments',
        value: '',
        readonly: true
      },
      {
        key: 'contact_address',
        value: 'ستارخان, کوچه لاله'
      },
      {
        key: 'contact_email',
        value: 'test@gmail.com'
      },
      {
        key: 'contact_number',
        value: '0212131232'
      },
      {
        key: 'homepage_header_video',
        value: ''
      },
      {
        key: 'homepage_comments_bg_image',
        value: ''
      },
      {
        key: 'homepage_services_course_image_url',
        value: ''
      },
      {
        key: 'homepage_services_fields_image_url',
        value: ''
      },
      {
        key: 'homepage_services_first_name',
        value: ''
      },
      {
        key: 'homepage_services_first_link',
        value: ''
      },
      {
        key: 'homepage_services_second_name',
        value: ''
      },
      {
        key: 'homepage_services_second_link',
        value: ''
      },
      {
        key: 'homepage_services_third_name',
        value: ''
      },
      {
        key: 'homepage_services_third_link',
        value: ''
      },
      {
        key: 'homepage_services_fourth_name',
        value: ''
      },
      {
        key: 'homepage_services_fourth_link',
        value: ''
      },
      {
        key: 'homepage_tour_title',
        value: ''
      },
      {
        key: 'homepage_tour_link_name',
        value: ''
      },
      {
        key: 'homepage_tour_link_url',
        value: ''
      },
      {
        key: 'homepage_tour_bg_image',
        value: ''
      },
      {
        key: 'homepage_teacher_title',
        value: ''
      },
      {
        key: 'homepage_teacher_desc',
        value: ''
      },
      {
        key: 'homepage_teacher_image',
        value: ''
      },
      {
        key: 'homepage_introduction_title',
        value: ''
      },
      {
        key: 'homepage_introduction_sub_title',
        value: ''
      },
      {
        key: 'homepage_introduction_video',
        value: ''
      },
      {
        key: 'homepage_introduction_first_image',
        value: ''
      },
      {
        key: 'homepage_introduction_first_title',
        value: ''
      },
      {
        key: 'homepage_introduction_first_desc',
        value: ''
      },
      {
        key: 'homepage_introduction_second_image',
        value: ''
      },
      {
        key: 'homepage_introduction_second_title',
        value: ''
      },
      {
        key: 'homepage_introduction_second_desc',
        value: ''
      },
      {
        key: 'homepage_introduction_third_image',
        value: ''
      },
      {
        key: 'homepage_introduction_third_title',
        value: ''
      },
      {
        key: 'homepage_introduction_third_desc',
        value: ''
      },
      {
        key: 'homepage_footer_about',
        value: ''
      }
    ];

    await Setting.remove({});
    await Setting.create(init_settings);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
