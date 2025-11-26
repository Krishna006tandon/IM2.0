// =========================================================
// FILE: src/QuizApp.js (UPDATED for Results)
// =========================================================

import React, { useState } from 'react';
import { quizQuestions } from './quizData';
import ResultScreen from './ResultScreen'; // New Import
import './App.css';

const QuizApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [attempts, setAttempts] = useState({}); // To store user's choices and correctness for results

  const currentQuestion = quizQuestions[currentIndex];

  // --- Core Handlers ---

  const handleOptionSelect = (id) => {
    if (!isAnswered) {
      setSelectedOption(id);
    }
  };

  const updateAttempts = (isCorrect) => {
      setAttempts(prev => ({
          ...prev,
          [currentQuestion.id]: {
              attempted: true,
              isCorrect: isCorrect,
              selectedId: selectedOption,
              correctId: currentQuestion.correctAnswerId
          }
      }));
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const isCorrect = selectedOption === currentQuestion.correctAnswerId;
      setIsAnswered(true);
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      
      updateAttempts(isCorrect);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(attempts[quizQuestions[currentIndex + 1].id]?.selectedId || null);
      setIsAnswered(attempts[quizQuestions[currentIndex + 1].id]?.attempted || false);
      window.scrollTo(0, 0);
    } else {
      // End of quiz
      setIsQuizFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(attempts[quizQuestions[currentIndex - 1].id]?.selectedId || null);
      setIsAnswered(attempts[quizQuestions[currentIndex - 1].id]?.attempted || false);
      window.scrollTo(0, 0);
    }
  };

  const resetQuiz = () => {
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setAttempts({});
      setIsQuizFinished(false);
      window.scrollTo(0, 0);
  };
  
  // --- Render Functions ---

  const renderOption = (option) => {
    const isSelected = selectedOption === option.id;
    const isCorrectAnswer = option.id === currentQuestion.correctAnswerId;
    
    let className = 'option-button';
    if (isSelected) {
      className += ' selected';
    }
    
    if (isAnswered) {
      className += ' answered';
      if (isCorrectAnswer) {
        className += ' correct';
      } else if (isSelected) {
        className += ' incorrect';
      }
    }

    return (
      <button
        key={option.id}
        className={className}
        onClick={() => handleOptionSelect(option.id)}
        disabled={isAnswered}
      >
        <span className="option-key">{option.id}.</span>
        <span>{option.text}</span>
      </button>
    );
  };
  
  // --- Main Render ---

  if (isQuizFinished) {
      return (
          <ResultScreen 
              score={score} 
              totalQuestions={quizQuestions.length} 
              attempts={attempts}
              resetQuiz={resetQuiz}
          />
      );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        MCQ Test (200 Questions)
      </div>
      
      <div className="question-card">
        <p className="question-status">
          Question {currentIndex + 1} / {quizQuestions.length} (ID: {currentQuestion.id})
        </p>
        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="options-container">
          {currentQuestion.options.map(renderOption)}
        </div>

        {isAnswered && (
          <p className={`feedback-text ${currentQuestion.correctAnswerId === selectedOption ? 'feedback-correct' : 'feedback-incorrect'}`}>
            {currentQuestion.correctAnswerId === selectedOption 
              ? 'Correct Answer! 🎉' 
              : `Incorrect! The correct answer is ${currentQuestion.correctAnswerId}. 🧐`}
          </p>
        )}
      </div>

      {/* Navigation/Action Bar */}
      <div className="navigation-bar">
        <button
          className="action-button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ⬅️ Previous
        </button>

        {!isAnswered ? (
          <button
            className="action-button"
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Check Answer ✅
          </button>
        ) : (
          <button
            className="action-button"
            onClick={handleNext}
          >
            {currentIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question ➡️'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizApp;