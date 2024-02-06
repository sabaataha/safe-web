import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/NicknamePage.module.css';
import { useRouter } from 'next/router';

const NicknamePage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [pin, setPin] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };
  const handleClick =() => {
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/addUser', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, pin }),
      });
     
      if (response.ok) {
        console.log('success');
        console.log(response.body);
        // Navigate to the '/avatarSelection' page after successful form submission
        router.push('/avatarSelection');
      } else {
        console.log('not working');
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit();
};
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter Your Nickname</h1>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={handleNicknameChange}
        className={styles.inputText}
      />
      <input
        type="text"
        placeholder="Enter Pin"
        value={pin}
        onChange={handlePinChange}
        className={styles.inputText}
      />
      <button onClick={handleClick} className={styles.saveButton}>
        Submit
      </button>
    </div>
  );
};

export default NicknamePage;
