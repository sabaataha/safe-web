// pages/GeneratePin.js
import styles from '../styles/GeneratePinCode.module.css';

import React, { useState } from 'react';

const GeneratePinCode = () => {
    const [pin, setPin] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleStartNewGame = () => {
        //onStartNewGame();
        // Redirect to the NicknamePage
        router.push('/NicknamePage');
        // Implement the logic to start a new game here
        //console.log('Starting a new game...');

    };

    // Function to generate a random PIN code
    const generatePin = () => {
        const newPin = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit PIN
        setPin(newPin.toString()); // Update the state with the generated PIN
        setIsButtonDisabled(false); // Enable the button

    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Generated PIN Code:</h1>
            <p>{pin}</p>
            <button onClick={generatePin}   className={styles.btn}>Generate PIN</button>
            <button className={styles.btn} onClick={handleStartNewGame} disabled={isButtonDisabled} className ={isButtonDisabled?styles.btnDisabled:styles.btnEanbled}>Start a New Game</button>

        </div>
    );
};

export default GeneratePinCode;
