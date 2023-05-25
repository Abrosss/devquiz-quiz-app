const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
 
  title: {
    type: String,
   
  },
  tips: {
    type: String
  }
});

module.exports = mongoose.model("Quiz", QuizSchema);
