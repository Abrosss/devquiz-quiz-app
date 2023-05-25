const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
 
  title: {
    type: String,
   
  },
  image: {
    type: String,
   
  },
  explanation: {
    type: String,
  },
  quizID: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' 
  },
  answers: {
    type: Array,
   
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
