import React, { useState } from 'react'; 
import { useRouter } from 'next/router';
import styles from '../styles/Question.module.css';


function QuesInformation() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const { information } = router.query;

  const handleCloseScreen = () => {
    setIsVisible(false);
    const currentQuestionIndex = parseInt(router.query.questionIndex, 10) || 0;
    const nextQuestionIndex = currentQuestionIndex + 1;
    router.push(`/question?questionIndex=${nextQuestionIndex}`);
  };
  const handleShowInformation = () => {
    const information = questions[currentQuestion].information;
    router.push({
      pathname: '/quesInformation',
      query: { information }
    });
  };


  return (
    <div>
      {isVisible && (
        <div>
          <h1>There Are Some Informations About the Question</h1>
          <p>{information}</p>
          <button onClick={handleCloseScreen} className={styles.linkButton}>Ok</button>
        </div>
      )}
    </div>
  );
}

export default QuesInformation;
