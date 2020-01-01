const mongoose = require('../config/mongoose');
const Setting = require('../api/services/settings/settings.model');
const User = require('../api/services/user/user.model');

const SETTING_DATA = require('./settings.json');
const ADMIN_DATA = require('./admin.json');

mongoose.connect();

async function initial_settings() {
  console.log('hello');
  await Setting.deleteMany({});
  const settings = await Setting.create(SETTING_DATA);
  console.log(settings);
}

async function initial_admin() {
  await User.deleteMany({});
  const admin = new User(ADMIN_DATA);
  await admin.save();
  console.log(admin);
}

Promise.all([initial_settings(), initial_admin()]).then(process.exit);
