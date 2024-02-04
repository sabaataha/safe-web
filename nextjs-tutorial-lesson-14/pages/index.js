import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
export default function Home() {
  return (
    <>
      <Head>
        <title>Risk Guard | Home</title>
        <meta name="keywords" content="SafeWebGame"/>
      </Head>
      <div>
        <h1 className={styles.title}>Risk Guard</h1>
        <p className={styles.text}>help Alex make smart choices to ensure a safe-web journey
          on Risk Guard!   </p>
        <Link href="" className={styles.btn}>
         Start a New Game 
        </Link>
        <div className="HomePicContainer">
          <div className="HomePic">
            <Image src="/HomePic.png" alt="HomePic" width={500} height={300} />
          </div>
        </div>
      </div>
    </>
  )
}
{/* <Link href="/ninjas/" className={styles.btn}>
Start a New Game 
</Link> */}
