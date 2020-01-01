const Settings = require('./settings.model');

exports.get = async id => Settings.findById(id);

exports.create = async settingsData => {
  try {
    const settings = new Settings(settingsData);
    const savedSettings = await settings.save();
    return savedSettings;
  } catch (error) {
    throw error;
  }
};
exports.update = async updatedData => {
  try {
    for (let setting of updatedData.settings) {
      const updatedSetting = await Settings.findOne({ key: setting.key });
      console.log(setting);
      updatedSetting.value = setting.value;
      await updatedSetting.save();
    }
    // const updatedSettings = { ...settings, ...updatedData };
    // const savedSettings = await updatedSettings.save();
    // return savedSettings;
    return { success: true };
  } catch (error) {
    throw error;
  }
};

exports.list = async params => {
  try {
    const settings = await Settings.find({});
    return settings;
  } catch (error) {
    throw error;
  }
};

exports.remove = async setting => await setting.remove();
