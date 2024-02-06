import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import ButtonStartNewGame from "./ButtonStartNewGame";
export default function Home() {
  return (
    <>
      <Head>
        <title>OnlySafie | Home</title>
        <meta name="keywords" content="SafeWebGame"/>
      </Head>
      <div>
        <h1 className={styles.title}>OnlySafie</h1>
        <p className={styles.text}>help Alex make smart choices to ensure a safe-web journey
          on Risk Guard!   </p>
        <ButtonStartNewGame/>
        {/*  <Link href="/NicknamePage" className={styles.btn}>*/}
        {/* Start a New Game */}
        {/*</Link>*/}
        <div className="HomePicContainer">
          <div className="HomePic">
            <Image src="/HomePic.png" alt="HomePic" width={500} height={300} />
          </div>
        </div>
      </div>
    </>
  )
}

