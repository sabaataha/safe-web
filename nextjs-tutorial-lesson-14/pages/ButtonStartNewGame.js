// StartNewGameButton.js
import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'


const ButtonStartNewGame = (props) => {
    const router = useRouter();
    //const handle = props.onStartNewGame();
    // Define the click event handler
    const handleClickStudent = () => {
        //onStartNewGame();
        // Redirect to the NicknamePage
        router.push('/NicknamePage');
        // Implement the logic to start a new game here
        //console.log('Starting a new game...');

    };
    const handleClickTeacher = () => {
        //onStartNewGame();
        // Redirect to the NicknamePage
        router.push('/GeneratePinCode');
        // Implement the logic to start a new game here
        //console.log('Starting a new game...');

    };

    return (
        <div>
            <div className = {styles.btnContainer}>
            <button className={styles.btn} onClick={handleClickTeacher} >I Am A Teacher</button>
            <button className={styles.btn} onClick={handleClickStudent} >I Am A Student </button>
            </div>
        </div>

    );
    // return (
    //     <Link href="/NicknamePage" className={styles.btn}>
    //         Start a New Game
    //     </Link>
    //     // <button onClick={handleClick}>Start A New Game</button>
    // );
};

export default ButtonStartNewGame;



