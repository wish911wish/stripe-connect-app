import * as React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
      <footer className={styles.footer}>
        <Link href="/">
          <a className={styles.card}>
          topへ
          </a>
        </Link>
      </footer>
    </div>
  )
}

export default Layout
