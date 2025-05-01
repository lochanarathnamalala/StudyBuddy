import React, { useState } from 'react';
import './science.css';

const scienceQuestions = [
  {
    question: "What is the chemical symbol for water?",
    answers: ["H2O", "CO2", "O2", "N2"],
    correctAnswer: "H2O"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars"
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide"
  },
  {
    question: "How many bones are there in the adult human body?",
    answers: ["206", "210", "198", "201"],
    correctAnswer: "206"
  },
  {
    question: "Which organ pumps blood through the body?",
    answers: ["Brain", "Lungs", "Heart", "Kidney"],
    correctAnswer: "Heart"
  }
];

const ScienceQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = scienceQuestions[currentIndex];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      if (currentIndex < scienceQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsFinished(true);
      }
    }, 1000);
  };

  const getResultMessage = () => {
    if (score === scienceQuestions.length) return "🏆 Perfect score!";
    else if (score >= scienceQuestions.length / 2) return "👍 Good job!";
    else return "📘 Keep practicing!";
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="quiz-card-container">
      {isFinished ? (
        <div className="result-page">
          <h2>Your Score: {score}/{scienceQuestions.length}</h2>
          <p>{getResultMessage()}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ScienceQuiz;
