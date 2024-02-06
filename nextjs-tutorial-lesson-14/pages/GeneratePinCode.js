// pages/GeneratePin.js
import styles from '../styles/GeneratePinCode.module.css';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useRouter } from 'next/router'; // Import useRouter for routing

const GeneratePinCode = () => {
    const [pin, setPin] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const router = useRouter();

    const handleStartNewGame = async () => {
        try {
            await axios.post('/api/savePin', { pin });
            // Redirect to the NicknamePage
            router.push('/question');
        } catch (error) {
            console.error('Error saving PIN code:', error);
        }
    };

    const generatePin = () => {
        const newPin = Math.floor(1000 + Math.random() * 9000);
        setPin(newPin.toString());
        setIsButtonDisabled(false);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Generated PIN Code:</h1>
            <p>{pin}</p>
            <button onClick={generatePin} className={styles.btn}>Generate PIN</button>
            <button
                onClick={handleStartNewGame}
                disabled={isButtonDisabled}
                className={isButtonDisabled ? styles.btnDisabled : styles.btnEnabled}>
                Start a New Game
            </button>
        </div>
    );
};

export default GeneratePinCode;
