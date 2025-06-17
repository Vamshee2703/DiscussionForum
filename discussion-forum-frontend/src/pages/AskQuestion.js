import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AskQuestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/questions', { title, description });
      navigate('/');
    } catch (err) {
      console.error('Error posting question:', err);
      alert('Could not post your question.');
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /><br /><br />
        <textarea
          placeholder="More details (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        /><br /><br />
        <button type="submit">Post Question</button>
      </form>
    </div>
  );
}

export default AskQuestion;
