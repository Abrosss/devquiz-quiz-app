const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.get("/questions/:quizId", apiController.getQuestions)
router.post("/questions", apiController.postQuestion)
router.put("/questions", apiController.editQuestion)
router.get("/quizzes", apiController.getQuizzes)
router.get("/quizzes/:id", apiController.getQuiz)
router.put("/quizzes/:id", apiController.addTips)
router.post("/addQuiz", apiController.postQuiz)
router.post("/addImage", apiController.postImage)
router.post("/deleteImage", apiController.deleteImage)
module.exports = router;
