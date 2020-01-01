const mongoose = require('../config/mongoose');
const Setting = require('../api/services/settings/settings.model');
const SETTING_DATA = require('./settings.json.js');

mongoose.connect();

Setting.deleteMany({}, err => {
  if (err) {
    console.log(err);
  } else {
    Setting.create(SETTING_DATA, (err, items) => {
      if (err) console.log(err);
      console.log(items);
    });
  }
});
