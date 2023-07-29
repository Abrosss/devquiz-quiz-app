const mongoose = require("mongoose");

const SharedQuizSchema = new mongoose.Schema({
 
  title: {
    type: String,
   
  },
  questions: {
    type: Array
  }
});

module.exports = mongoose.model("SharedQuiz", SharedQuizSchema);
