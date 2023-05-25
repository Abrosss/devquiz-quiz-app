const Question = require("../models/Question")
const Quiz = require("../models/Quiz")
const cloudinary = require("../config/cloudinary");
module.exports = {
 
  
  postImage: async (req, res) => {
    const file = req.body.image;
    console.log(file)
    cloudinary.uploader.upload(file, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
      }
  
      console.log(result);
      res.json({ url: result.secure_url, id: result.public_id });
  })

},
deleteImage: async (req, res) => {
  try {
    // Find post by id
    let id = req.body.cloudinaryId
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(id);
    res.json('cool')
  } catch (err) {
    res.redirect("/profile");
  }
},
  getQuizzes: async (req, res) => {
    try {
      const quizzes = await Quiz.find({})
    
        res.json(quizzes)
      
     
    } catch (err) {
      console.log(err);
    }

  }, 
  getQuiz: async (req, res) => {
    let quizId = req.params.id
    try {
      const quiz = await Quiz.find({_id:quizId})
    
        res.json(quiz)
      
     
    } catch (err) {
      console.log(err);
    }

  },
  postQuiz: async (req, res) => {
    
    try {
      let title = req.body.title

      const newQuiz = await Quiz.create({
        title: title
      });
    
              
              res.send(newQuiz._id)
            } catch (err) {
              console.log(err);
            }
  },
  postQuestion: async (req, res) => {
    try {
      let questions = req.body.questions
      let quizID = req.body.quizID
      questions.map(async question => {
        // check if the question already exists in the database
        const existingQuestion = await Question.findOne({ title: question.title })
  
        if (existingQuestion) {
          // if the question exists, update it
          existingQuestion.image = question.image
          existingQuestion.quizID = quizID
          existingQuestion.answers = question.options
          existingQuestion.explanation = question.explanation
  
          await existingQuestion.save()
        } else {
          // if the question doesn't exist, create it
          await Question.create({
            title: question.title,
            image: question.image,
            quizID: quizID,
            answers: question.options,
            explanation: question.explanation
          })
        }
      })
  
      res.send('questions added or updated')
    } catch (err) {
      console.log(err)
    }
  },
  
  editQuestion: async (req, res) => {
    if(!req.body){
      return res
      .status(400)
      .send({message: 'nothing to update'})
    }
    let questions = req.body.questions
    console.log(questions)
    try {
      const updatedQuestions = await Promise.all(
        questions.map(async (question) => {
          let updatedQuestion = {
            $set: {
              title: question.title,
              image: question.image,
              quizID: question.quizID,
              answers: question.answers,
              explanation: question.explanation,
            },
          };
          console.log(updatedQuestion);
          const data = await Question.findByIdAndUpdate(
            question._id,
            updatedQuestion,
            { new: true }
          );
          console.log(data);
          if (!data) {
            return res.status(404).send({ message: 'question is not found' });
          }
          return data;
        })
      );
      res.send(updatedQuestions);
      } catch(err) {
        res.status(500).send({message: 'error updating question: ' + err})
      }
     },
      
  addTips: async (req, res) => {
    console.log('sfsefsefsef')
    if(!req.body){
      return res
      .status(400)
      .send({message: 'nothing to update'})
    }
    let id = req.params.id
    let tips = req.body.tips
    console.log(tips)
    try {

          let addedTips = {
            $set: {
              tips: tips,
              
            },
          };
         
          const data = await Quiz.findByIdAndUpdate(
            id,
            addedTips,
            { new: true }
          );
          res.send(data)
          if (!data) {
            return res.status(404).send({ message: 'quiz is not found' });
          }
          return data;
        
    
      } catch(err) {
        res.status(500).send({message: 'error updating question: ' + err})
      }
     },
  getQuestions: async (req, res) => {
    let quizId = req.params.quizId
    try {
      const questions = await Question.find({quizID:quizId})
    
        res.json(questions)
      
     
    } catch (err) {
      console.log(err);
    }

  }, 
  
}

