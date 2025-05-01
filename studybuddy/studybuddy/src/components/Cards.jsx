import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';

const questions = [
  {
    question: "4 + 4?",
    correctAnswer: "8",
    answers: ["8", "16", "12", "24"]
  },
  {
    question: "5 x 2?",
    correctAnswer: "10",
    answers: ["2", "10", "7", "25"]
  },
  {
    question: "10 - 3?",
    correctAnswer: "7",
    answers: ["13", "6", "7", "9"]
  },
  {
    question: "6 ÷ 2?",
    correctAnswer: "3",
    answers: ["3", "4", "2", "1"]
  }
];

const Card = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showSlide, setShowSlide] = useState(true);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false); // Track quiz completion
  const [bgTransition, setBgTransition] = useState(false); // Background transition

  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    // Update score if answer is correct
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }

    // Slide out effect
    setTimeout(() => {
      setShowSlide(false);
    }, 500);

    // Move to next slide
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setShowSlide(true);
      } else {
        setIsFinished(true); // Mark quiz as finished
        setBgTransition(true); // Trigger background transition
      }
    }, 1000);
  };

  const getResultMessage = () => {
    if (score === questions.length) {
      return "🏆 Perfect!";
    } else if (score >= questions.length / 2) {
      return "🥇 Good Job!";
    } else {
      return "🙁 Better Luck Next Time!";
    }
  };

  return (
    <div className={`cards ${bgTransition ? 'background-transition' : ''}`}>
      {isFinished ? (
        // Display the result page after the quiz is finished
        <div className="result-page">
          <h2>Your Score: {score}/{questions.length}</h2>
          <p>{getResultMessage()}</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      ) : (
        // Display quiz content while it's ongoing
        <div className="quiz-card-container">
          <div className={`slide ${showSlide ? 'slide-in' : 'slide-out'}`}>
            <div className="question-card">
              <h2>{currentQuestion.question}</h2>
            </div>

            <div className="answer-cards">
              {currentQuestion.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`answer-card ${selectedAnswer === answer ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleAnswerClick(answer)}
                >
                  {answer}
                </div>
              ))}
            </div>

            {selectedAnswer && (
              <div className="feedback">
                {isCorrect ? "✅ Correct!" : "❌ Incorrect!"} You selected: {selectedAnswer}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
