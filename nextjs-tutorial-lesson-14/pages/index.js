import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ninja List | Home</title>
        <meta name="keywords" content="ninjas"/>
      </Head>
      <div>
        <h1 className={styles.title}>Risk Guard</h1>
        <p className={styles.text}>help Alex make smart choices to ensure a safe-web journey
          on Risk Guard!   </p>
        <Link href="/ninjas/" className={styles.btn}>
         Start a New Game 
        </Link>
      </div>
    </>
  )
}
