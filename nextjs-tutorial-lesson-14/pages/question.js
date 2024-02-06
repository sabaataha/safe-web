import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Question.module.css';
import BarChart from '../comps/BarChart.js';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const userRole = "teacher";

const Question = ({ toggleStatistics }) => { // Receive toggleStatistics function as prop
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showStatistics, setShowStatistics] = useState(false);

  const [optionCounts, setOptionCounts] = useState(Array.from({ length: 4 }, () => Array(4).fill(0)));
  const router = useRouter();

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


  const handleNextQuestion = () => {
    if (userRole === 'teacher') {
      const nextQuestionIndex = currentQuestion + 1;
      setCurrentQuestion(nextQuestionIndex);
      socket.emit('nextQuestion', nextQuestionIndex); // Emit event to server to move to the next question
      setSelectedOption(null);
    }
  };

  const handleEndGame = () => {
    // Handle end game logic here
  };

  useEffect(() => {
    socket.on('moveToNextQuestion', (nextQuestionIndex) => {
      setCurrentQuestion(nextQuestionIndex);
    });

    return () => {
      socket.off('moveToNextQuestion');
    };
  }, []);

  const handleAnswerClick = (index) => {
    setSelectedOption(index);
    // Emit the answer to the server
    socket.emit('submitAnswer', { questionId: questions[currentQuestion].id, selectedOption: index});
    // Increment the count for the selected option
    setOptionCounts((prevCounts) => {
      const newCounts = prevCounts.map((counts, i) =>
        i === index ? counts.map((count, j) => (j === index ? count + 1 : count)) : counts
      );
      return newCounts;
    });
  };

  useEffect(() => {
    // Listen for answer submissions from other users
    socket.on('answerSubmitted', (data) => {
      console.log('Received answer submission update:', data);
      // Update optionCounts or perform other necessary actions
    });

    // Clean up event listeners on component unmount
    return () => {
      socket.off('answerSubmitted');
    };
  }, []);


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
          {selectedOption !== null && (
            <div className={styles.feedback}>
              {/* Add feedback content here if needed */}
            </div>
          )}
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
          {currentQuestion === questions.length - 1 && ( // Render End Game button when on the last question
            <div>
              <button onClick={handleEndGame} className={styles.linkButton}>
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
