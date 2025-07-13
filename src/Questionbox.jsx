import React, { useEffect, useState } from "react";

function QuestionBox({ text }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const cleanAndGenerateQuestions = (text) => {
      
      const cleanedText = text
        .replace(/[^a-zA-Z0-9.,!? \n]/g, " ") 
        .replace(/\s+/g, " ")              
        .replace(/\n+/g, " ")            
        .trim();

 
      const sentences = cleanedText.split(/\. |\? |! /).filter(s => s.length > 30);


      const generatedQuestions = sentences.slice(0, 5).map((sentence, idx) => {
        return `Q${idx + 1}: What does this mean? → "${sentence.trim()}?"`;
      });

      return generatedQuestions;
    };

    const questions = cleanAndGenerateQuestions(text);
    setQuestions(questions);
  }, [text]);

  return (
    <div>
      <h2>Auto-Generated Questions:</h2>
      {questions.length === 0 ? (
        <p>No valid content found to generate questions.</p>
      ) : (
        <ul>
          {questions.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionBox;
