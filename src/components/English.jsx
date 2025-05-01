import React, { useState } from 'react';
import './english.css';

const englishQuestions = [
  {
    question: "Which sentence is grammatically correct?",
    options: ["He don't like apples.", "She go to school.", "They is running.", "He plays football."],
    answer: "He plays football.",
  },
  {
    question: "What is the past tense of 'run'?",
    options: ["runned", "running", "ran", "runs"],
    answer: "ran",
  },
  {
    question: "Choose the synonym for 'happy':",
    options: ["sad", "angry", "joyful", "tired"],
    answer: "joyful",
  },
  {
    question: "What is a noun?",
    options: ["An action word", "A describing word", "A name of a person, place, or thing", "A feeling"],
    answer: "A name of a person, place, or thing",
  }
];

const English = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = englishQuestions[currentIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setSelectedOption('');
    if (currentIndex < englishQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const getResultMessage = () => {
    if (score === englishQuestions.length) {
      return "🏆 Perfect!";
    } else if (score >= englishQuestions.length / 2) {
      return "🥇 Good Job!";
    } else {
      return "🙁 Better Luck Next Time!";
    }
  };

  return (
    <div className="quiz-card-container">
      {isFinished ? (
        // Display the result page after the quiz is finished
        <div className="result-page">
          <h2>Your Score: {score}/{englishQuestions.length}</h2>
          <p>{getResultMessage()}</p>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      ) : (
        // Display quiz content while it's ongoing
        <div className="quiz-card">
          <h2 className="question-text">{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button 
                  ${showAnswer && option === currentQuestion.answer ? 'correct' : ''} 
                  ${showAnswer && option === selectedOption && option !== currentQuestion.answer ? 'wrong' : ''}`}
                onClick={() => handleOptionClick(option)}
                disabled={showAnswer}
              >
                {option}
              </button>
            ))}
          </div>
          {showAnswer && (
            <div className="feedback">
              {selectedOption === currentQuestion.answer ? "✅ Correct!" : "❌ Incorrect!"}
            </div>
          )}
          {showAnswer && (
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default English;
