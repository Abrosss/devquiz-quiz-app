const Question = require("../models/Question")
const Quiz = require("../models/Quiz")
const cloudinary = require("../config/cloudinary");
const PDFDocument = require('pdfkit');
module.exports = {


  postImage: async (req, res) => {
    const file = req.body.image;
    
    cloudinary.uploader.upload(file, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
      }


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
      const quiz = await Quiz.find({ _id: quizId })

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
  deleteQuiz: async (req, res) => {

    const id = req.params.id

    try {
      Quiz.findByIdAndDelete(id, err => {
        if (err) return console.log(err)
      })
      Question.findOneAndDelete({ quizID: id }, err => {
        if (err) return console.log(err)
      })
      res.send('quiz deleted')
    }
    catch (err) {
      console.log(err);
    }


  },
  deleteQuestion: async (req, res) => {

    const IDs = req.body.ids

    try {
      await Question.deleteMany({ _id: { $in: IDs } });
      console.log('Questions deleted successfully');
    } catch (err) {
      console.error('Error deleting questions:', err);
    }


  },
  postQuestion: async (req, res) => {
    try {
      let questions = req.body.questions

      let quizID = req.body.quizID
    
      questions.map(async question => {
     
          // if the question doesn't exist, create it
          await Question.create({
            title: question.title,
            image: question.image,
            quizID: quizID,
            answers: question.answers,
            explanation: question.explanation
          })
        
      })

      res.send('questions added or updated')
    } catch (err) {
      console.log(err)
    }
  },

  editQuestion: async (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: 'nothing to update' });
    }
    const questions = req.body.questions;
    
    try {
      await Promise.all(
        questions.map(async (question) => {
          const updatedQuestion = {
            $set: {
              title: question.title,
              image: question.image,
              quizID: question.quizID,
              answers: question.answers,
              explanation: question.explanation,
            },
          };
     
          const data = await Question.findByIdAndUpdate(
            question._id,
            updatedQuestion,
            { new: true }
          );
          if (!data) {
            throw new Error('question is not found');
          }
        })
      );

      res.status(200).send({ message: 'Questions updated successfully' });
    } catch (err) {
      res.status(500).send({ message: 'error updating question: ' + err });
    }
  },
  editQuiz: async (req, res) => {

    if (!req.body) {
      return res.status(400).send({ message: 'nothing to update' });
    }
    let id = req.params.id;
    let title = req.body.title
    try {
      
          let updatedQuiz = {
            $set: {
              title: title
            },
          };

          const data = await Quiz.findByIdAndUpdate(
            id,
            updatedQuiz
          );

          if (!data) {
            throw new Error('quiz  is not found');
          }
        
      

      res.status(200).send({ message: 'Questions updated successfully' });
    } catch (err) {
      res.status(500).send({ message: 'error updating question: ' + err });
    }
  },

  addTips: async (req, res) => {

    if (!req.body) {
      return res
        .status(400)
        .send({ message: 'nothing to update' })
    }
    let id = req.params.id
    let tips = req.body.tips
   
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


    } catch (err) {
      res.status(500).send({ message: 'error updating question: ' + err })
    }
  },
  getQuestions: async (req, res) => {
    let quizId = req.params.quizId
    try {
      const questions = await Question.find({ quizID: quizId })

      res.json(questions)


    } catch (err) {
      console.log(err);
    }

  },


}

