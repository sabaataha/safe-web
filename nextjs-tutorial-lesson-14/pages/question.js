// Import necessary libraries and modules
import React, { useState, useEffect } from 'react';
import styles from '../styles/Question.module.css';
import BarChart from '../comps/BarChart.js';
import io from 'socket.io-client';
import { useRouter } from 'next/router';

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Question = ({ toggleStatistics }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [optionCounts, setOptionCounts] = useState(Array.from({ length: 4 }, () => Array(4).fill(0)));
  const router = useRouter();
  const { userRole } = router.query;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('http://localhost:3000/api/questions')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  };

  // Handler for moving to the next question
  const handleNextQuestion = () => {
    if (userRole === 'teacher') {
      const nextQuestionIndex = currentQuestion + 1;
      setCurrentQuestion(nextQuestionIndex);
      setSelectedOption(null);
      socket.emit('nextQuestion', nextQuestionIndex);
    }
  };

  // Handler for submitting an answer
  const handleAnswerClick = (index) => {
    setSelectedOption(index);
    const socketId = socket.id; 
    socket.emit('submitAnswer', { userId: socketId,questionId: questions[currentQuestion].id, selectedOption: index });
    setOptionCounts((prevCounts) => {
      const newCounts = prevCounts.map((counts, i) =>
        i === index ? counts.map((count, j) => (j === index ? count + 1 : count)) : counts
      );
      return newCounts;
    });
  };

  // Listen for events emitted by the server
  useEffect(() => {
    socket.on('moveToNextQuestion', (nextQuestionIndex) => {
      setCurrentQuestion(nextQuestionIndex);
      setSelectedOption(null); // Reset selected option when moving to next question
    });

    socket.on('answerSubmitted', (data) => {
      // Update optionCounts or perform other necessary actions
    });

    return () => {
      // Clean up event listeners on component unmount
      socket.off('moveToNextQuestion');
      socket.off('answerSubmitted');
    };
  }, []);

  // Helper function to determine if an answer is correct
  const isCorrectAnswer = (index) => {
    return selectedOption !== null && index === questions[currentQuestion].correctAnswer;
  };

  // Helper function to generate class names for options
  const getCardClassName = (index) => {
    const isSelected = selectedOption === index;
    const isCorrect = isCorrectAnswer(index);
    return `${styles.card} ${isSelected && styles.selected} ${isCorrect && styles.correct} ${isSelected && !isCorrect && styles.incorrect}`;
  };

  // Handlers for showing statistics and information
  const handleShowStatistics = () => {
    setShowStatistics(true);
  };

  const handleShowInformation = () => {
    const information = questions[currentQuestion].information;
    router.push({
      pathname: '/quesInformation',
      query: { information }
    });
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
          {currentQuestion < questions.length - 1 && (
            <div>
             {userRole === 'teacher' && (
                <button onClick={handleNextQuestion} className={styles.nextbutton}>
                  Next Question
                </button>
              )}
              <a onClick={handleShowInformation} className={styles.linkButton}>Information</a>
              <a onClick={handleShowStatistics} className={styles.linkButton}>
                Statistics
              </a>
            </div>
          )}
          {currentQuestion === questions.length - 1 && (
            <div>
              <button className={styles.linkButton}>
                End Game
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
