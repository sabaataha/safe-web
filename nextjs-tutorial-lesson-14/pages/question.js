// pages/index.js
import { useState, useEffect } from 'react';
import styles from '../styles/Question.module.css';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/questions')
      .then((response) => response.json())
      .then((data) => {setQuestions(data);
        console.log(data);});

      
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(null);
  };

  const handleAnswerClick = (index) => {
    setSelectedOption(index);
    console.log(index);
  };

  const isCorrectAnswer = (index) => {
    return selectedOption !== null && index === questions[currentQuestion].correctAnswer;
  };

  const getCardClassName = (index) => {
    const isSelected = selectedOption === index;
    const isCorrect = isCorrectAnswer(index);
    console.log(isCorrect);

    return `${styles.card} ${isSelected && styles.selected} ${isCorrect && styles.correct} ${isSelected && !isCorrect && styles.incorrect}`;
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
            </div>
          )}
          {currentQuestion < questions.length - 1 && (
            <button onClick={handleNextQuestion} className={styles.nextbutton}>
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
