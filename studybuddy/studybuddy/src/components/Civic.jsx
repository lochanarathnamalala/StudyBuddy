import React, { useState } from 'react';
import './civic.css'; // Optional CSS styling

const civicQuestions = [
  {
    question: "What is the highest law of the country?",
    options: ["The Constitution", "Parliamentary Law", "President's Order", "Supreme Court Ruling"],
    answer: "The Constitution",
  },
  {
    question: "Who elects the President in Sri Lanka?",
    options: ["Prime Minister", "Public through election", "Parliament", "Supreme Court"],
    answer: "Public through election",
  },
  {
    question: "What is the main responsibility of a citizen?",
    options: ["Pay taxes", "Vote in elections", "Obey laws", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "What type of government does Sri Lanka have?",
    options: ["Monarchy", "Democracy", "Dictatorship", "Federal"],
    answer: "Democracy",
  }
];

const Civic = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = civicQuestions[currentIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setSelectedOption('');
    if (currentIndex < civicQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Quiz Completed!");
    }
  };

  return (
    <div className="quiz-card-container">
      <div className="quiz-card">
        <h2>{currentQuestion.question}</h2>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${showAnswer && option === currentQuestion.answer ? 'correct' : ''} ${showAnswer && option === selectedOption && option !== currentQuestion.answer ? 'wrong' : ''}`}
              onClick={() => handleOptionClick(option)}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        {showAnswer && (
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Civic;
