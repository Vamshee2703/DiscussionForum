const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  const questions = await Question.find().sort({ createdAt: -1 });
  res.json(questions);
});

// Get single question
router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.json(question);
});

// Create question
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const question = new Question({ title, description });
  await question.save();
  res.status(201).json(question);
});

module.exports = router;
