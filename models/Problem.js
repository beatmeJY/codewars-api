const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { required: true, type: String },
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: [
    {
      code: String,
      solution: String
    }
  ]
});

module.exports = mongoose.model('Problem', problemSchema);