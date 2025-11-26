// =========================================================
// FILE: src/ResultScreen.js
// DESCRIPTION: Displays the final quiz results and analysis.
// =========================================================

import React from 'react';
import './App.css'; // For shared dark theme styles

const ResultScreen = ({ score, totalQuestions, attempts, resetQuiz }) => {
  const percentage = (score / totalQuestions) * 100;
  
  // 📈 Performance Analysis
  let message;
  if (percentage >= 80) {
    message = "Excellent! You have a strong grasp of the material. Keep up the great work! 🌟";
  } else if (percentage >= 60) {
    message = "Good Effort! You passed, but there's room for improvement in some units. 💪";
  } else if (percentage >= 40) {
    message = "Needs Improvement. Review the core HRM, Safety, and Marketing concepts. 📚";
  } else {
    message = "Time to Study! A thorough review of all units is recommended. Start now! 💡";
  }

  // Calculate specific scores if 'attempts' object is passed (Advanced)
  const correctCount = Object.values(attempts).filter(a => a.isCorrect).length;
  const incorrectCount = Object.values(attempts).filter(a => !a.isCorrect && a.attempted).length;
  const skippedCount = totalQuestions - correctCount - incorrectCount;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        Quiz Results
      </div>
      
      <div className="result-card question-card">
        <h2 className="question-text" style={{ color: percentage >= 60 ? '#4CAF50' : '#ff4d4f' }}>
          Your Score: {score} / {totalQuestions}
        </h2>
        <p className="percentage-text" style={{ fontSize: '2em', fontWeight: '900', margin: '20px 0' }}>
          {percentage.toFixed(2)}%
        </p>
        
        <p className="feedback-text">{message}</p>

        <hr style={{ borderColor: '#333333', margin: '30px 0' }} />

        {/* Detailed Breakdown */}
        <div className="breakdown-grid">
          <div className="breakdown-item correct">
            <span className="breakdown-value">{correctCount}</span>
            <span className="breakdown-label">Correct Answers ✅</span>
          </div>
          <div className="breakdown-item incorrect">
            <span className="breakdown-value">{incorrectCount}</span>
            <span className="breakdown-label">Incorrect Answers ❌</span>
          </div>
          <div className="breakdown-item skipped">
            <span className="breakdown-value">{skippedCount}</span>
            <span className="breakdown-label">Skipped Questions 🤷‍♂️</span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            className="action-button" 
            onClick={resetQuiz} 
            style={{ minWidth: 200 }}
          >
            Start New Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;