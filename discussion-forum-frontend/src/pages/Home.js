import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Error loading questions:', err));
  }, []);

  return (
    <div>
      <h2>All Questions</h2>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul>
          {questions.map(q => (
            <li key={q._id}>
              <Link to={`/questions/${q._id}`}>{q.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
