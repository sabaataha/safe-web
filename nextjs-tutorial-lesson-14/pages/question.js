// pages/index.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Question.module.css';
import BarChart from '../comps/BarChart.js';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [optionCounts, setOptionCounts] = useState(Array.from({ length: 4 }, () => Array(4).fill(0))); // Initialize option counts

  useEffect(() => {
    fetch('http://localhost:3000/api/questions')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        console.log(data);
      });
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
  };

  const handleAnswerClick = (index) => {
    setSelectedOption(index);
    // Increment the count for the selected option
    setOptionCounts((prevCounts) => {
      const newCounts = prevCounts.map((counts, i) =>
        i === index ? counts.map((count, j) => (j === index ? count + 1 : count)) : counts
      );
      return newCounts;
    });
  };

  const isCorrectAnswer = (index) => {
    return selectedOption !== null && index === questions[currentQuestion].correctAnswer;
  };

  const getCardClassName = (index) => {
    const isSelected = selectedOption === index;
    const isCorrect = isCorrectAnswer(index);

    return `${styles.card} ${isSelected && styles.selected} ${isCorrect && styles.correct} ${isSelected && !isCorrect && styles.incorrect}`;
  };

  const handleShowStatistics = () => {
    setShowStatistics(true);
  };

  return (
    <div className={styles.container}>
      {questions.length > 0 && (
        <div className={styles.question}>
          <div className={styles.questionnumber}>Question {currentQuestion + 1}</div>
          <h1>{questions[currentQuestion].question}</h1>
          <img src="/consentinexualrelationships.jpg" alt="Question Image" className={styles.questionImage} />
          <div className={styles.options}>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={getCardClassName(index)}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedOption !== null && (
            <div className={styles.feedback}>
              {/* Add feedback content here if needed */}
            </div>
          )}
          {currentQuestion < questions.length - 1 && (
            <div>
              <button onClick={handleNextQuestion} className={styles.nextbutton}>
                Next Question
              </button>
              <button onClick={handleShowStatistics} className={styles.nextbutton}>
                Statistics
              </button>
            </div>
          )}
        </div>
      )}

      {showStatistics && <BarChart data={optionCounts} />} {/* Pass optionCounts to BarChart component */}
    </div>
  );
};

export default Question;