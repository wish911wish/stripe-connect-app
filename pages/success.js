import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Success!!
        </h1>

        <div className={styles.grid}>
          <a href="/" className={styles.card}>
            <h3>stripeの登録が完了しました。</h3>
            <p>Topへ戻る</p>
          </a>
        </div>
      </main>

    </div>
  )
}
