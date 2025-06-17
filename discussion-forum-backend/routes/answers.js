const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

// Get all answers for a question
router.get('/:questionId', async (req, res) => {
  const answers = await Answer.find({ questionId: req.params.questionId }).sort({ createdAt: -1 });
  res.json(answers);
});

// Create answer
router.post('/', async (req, res) => {
  const { questionId, text } = req.body;
  const answer = new Answer({ questionId, text });
  await answer.save();
  res.status(201).json(answer);
});

module.exports = router;
