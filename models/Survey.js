const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  }
  ,
  sports: {
    type: String,
    required: true
  }
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;