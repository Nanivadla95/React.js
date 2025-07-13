import React from 'react';

const QuestionBox = ({ question, setQuestion, onAsk }) => (
  <div style={{ marginTop: '20px' }}>
    <input
      type="text"
      placeholder="Ask a question..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
    />
    <button onClick={onAsk} style={{ padding: '10px 20px' }}>Ask</button>
  </div>
);

export default QuestionBox;
