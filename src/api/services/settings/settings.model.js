const mongoose = require('mongoose');

// const homepageSettingsSchema = new mongoose.Schema({
//   header_image: {
//     type: String
//   }
// });

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    trim: true
  },
  readonly: {
    type: Boolean,
    default: false
  }
});

/**
 * @typedef Settings
 */
module.exports = mongoose.model('Settings', settingsSchema);
