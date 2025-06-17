import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AskQuestion from './pages/AskQuestion';
import QuestionPage from './pages/QuestionPage';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Discussion Forum</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/ask">Ask Question</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
      </Routes>
    </div>
  );
}

export default App;
