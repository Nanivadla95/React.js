import React from 'react';

const AnswerBox = ({ answer }) => {
  return (
    <div className="p-4 text-green-700">
      <strong>Answer:</strong> {answer || 'No answer yet'}
    </div>
  );
};

export default AnswerBox;
