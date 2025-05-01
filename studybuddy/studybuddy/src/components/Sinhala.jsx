// Sinhala.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';

const sinhalaQuestions = [
  {
    question: "මීට පහළින් කුමන වාක්‍යය නිවැරදියි?",
    answers: [
      "ඔහු පාසලට යයි.",
      "ඔහු පාසලට යන්නෙ.",
      "ඔහු පාසලට යනවාය්.",
      "ඔහු පාසලට යනවද?"
    ],
    correctAnswer: "ඔහු පාසලට යයි.",
  },
  {
    question: "‘ගිහිං’ යනු කුමක්ද?",
    answers: [
      "ක්‍රියාවක්",
      "නාමපදයක්",
      "විශේෂණයක්",
      "අව්‍යය පදයක්"
    ],
    correctAnswer: "ක්‍රියාවක්",
  },
  {
    question: "‘රජතුමා’ යන්නෙ කුමන වර්ගයේ නාමපදයක්ද?",
    answers: [
      "සාමාන්‍ය නාමපදයක්",
      "විශේෂ නාමපදයක්",
      "සර්වනාමපදයක්",
      "අනියත නාමපදයක්"
    ],
    correctAnswer: "විශේෂ නාමපදයක්",
  },
  {
    question: "‘පසුව’ යන්නෙ අර්ථය කුමක්ද?",
    answers: [
      "පෙර",
      "පසුව",
      "ඇතුළත",
      "බාහිර"
    ],
    correctAnswer: "පසුව",
  }
];

const Sinhala = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showSlide, setShowSlide] = useState(true);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [bgTransition, setBgTransition] = useState(false);

  const navigate = useNavigate();
  const currentQuestion = sinhalaQuestions[currentIndex];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => setShowSlide(false), 500);
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      if (currentIndex < sinhalaQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowSlide(true);
      } else {
        setIsFinished(true);
        setBgTransition(true);
      }
    }, 1000);
  };

  const getResultMessage = () => {
    if (score === sinhalaQuestions.length) return "🏆 පරිපූර්ණයි!";
    else if (score >= sinhalaQuestions.length / 2) return "🥇 හොඳ වැඩක්!";
    else return "🙁 නැවත උත්සාහ කරන්න!";
  };

  return (
    <div className={`cards ${bgTransition ? 'background-transition' : ''}`}>
      {isFinished ? (
        <div className="result-page">
          <h2>ඔබේ ලකුණු: {score}/{sinhalaQuestions.length}</h2>
          <p>{getResultMessage()}</p>
          <button onClick={() => navigate('/')}>මුල් පිටුවට</button>
        </div>
      ) : (
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
                {isCorrect ? "✅ නිවැරදියි!" : "❌ වැරදියි!"} ඔබ තෝරාගත්තේ: {selectedAnswer}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sinhala;
