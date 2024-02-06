import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/NicknamePage.module.css';
import { useRouter } from 'next/router';

const NicknamePage = () => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handlePinChange = (e) => {
    setNickname(e.target.value);
  };
  //we need to change this and save nickname in db for example 
  const saveNickname = () => {
    localStorage.setItem('nickname', nickname);
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
        value={nickname}
        onChange={handlePinChange}
        className={styles.inputText}
      />
      <Link href="/avatarSelection" className={styles.saveButton}>
        Submit
      </Link>
    </div>
  );
};

export default NicknamePage;
