// pages/nickname.js
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/NicknamePage.module.css';

const NicknamePage = () => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const saveNickname = () => {
    localStorage.setItem('nickname', nickname);
    // Redirect to the main game page or any other page
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter Your Nickname</h1>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={handleNicknameChange}
        className='inputText'
      />
      <Link href="/avatarSelection" className={styles.saveButton}>
        Save Nickname
      </Link>
    </div>
  );
};

export default NicknamePage;
