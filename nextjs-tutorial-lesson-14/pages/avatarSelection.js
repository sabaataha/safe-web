import { useState } from 'react';
import Link from 'next/link'
import styles from '../styles/AvatarSelection.module.css'; 

const avatarList = [
  '/avatars/avatarImage1.png',
  '/avatars/avatarImage2.png',
  '/avatars/avatarImage3.png',
  '/avatars/avatarImage4.png',
  '/avatars/avatarImage5.png',
];

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  return (
    <div>
      <h1>Choose Your Avatar</h1>
      <div className={styles['avatar-container']}>
        {avatarList.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className={`${styles['avatar-img']} ${selectedAvatar === avatar ? styles.selected : ''}`}
            onClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </div>
      {selectedAvatar && (
          <Link href="/question" className={styles.btnAvatar}>
         Start Quiz
         </Link>
      )}
    </div>
  );
};

export default AvatarSelection;
