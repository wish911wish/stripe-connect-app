import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import { POST, GET } from '../lib/axios'
import stripe from '../lib/stripe'

const IndexPage = (props) => {
  const router = useRouter()

  const post = async () => {
    const result = await POST('/api/create-connect-account', { name: 'test', email: 'test@mail.com'})
    await router.push(result.url)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Stripe Connectのテスト!
        </h1>
        <button id="submit" onClick={() => post()}>Setup payouts on Stripe</button>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const accounts = await stripe.accounts.list()

  const accountData = []
  accounts.data.forEach(account => {
    accountData.push({
      name: account.business_profile.name,
      id: account.id
    })
  })

  return {
    props: {
      accountData: accountData,
    }
  }
}

export default IndexPage
