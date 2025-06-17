import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function QuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    axios.get(`/api/questions/${id}`)
      .then(res => setQuestion(res.data))
      .catch(err => console.error('Error loading question:', err));

    axios.get(`/api/answers/${id}`)
      .then(res => setAnswers(res.data))
      .catch(err => console.error('Error loading answers:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/answers', { questionId: id, text: answerText });
      setAnswerText('');
      const res = await axios.get(`/api/answers/${id}`);
      setAnswers(res.data);
    } catch (err) {
      console.error('Error posting answer:', err);
      alert('Could not post your answer.');
    }
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div>
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <hr />
      <h3>Answers</h3>
      {answers.length === 0 ? <p>No answers yet.</p> : (
        <ul>
          {answers.map(a => <li key={a._id}>{a.text}</li>)}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your answer..."
          value={answerText}
          onChange={e => setAnswerText(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Post Answer</button>
      </form>
    </div>
  );
}

export default QuestionPage;