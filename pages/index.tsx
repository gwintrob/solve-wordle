import Head from 'next/head'
import WordleForm from '../components/WordleForm'
import styles from '../styles/Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Beat Wordle</title>
        <meta name="description" content="Beat your favorite daily puzzle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Beat Wordle
        </h1>

        <WordleForm />
      </main>


      <footer className={styles.footer}>
        <a
          href="https://twitter.com/gwintrob"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by @gwintrob
        </a>
      </footer>
    </div>
  )
}

export default Home
