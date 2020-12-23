import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import stripe from '../../lib/stripe'
import { POST, GET } from '../../lib/axios'

const RegisterPage = (props) => {
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
      <h2>店舗オーナー用のメニュー</h2>
      <div className={styles.grid}>	
        <div className={styles.card} onClick={() => post()}>
          <p>店舗の銀行口座を登録する</p>
        </div>
      </div>
    </main>
  </div>
  )
}

export const getServerSideProps = async () => {
  const customerName = `ユーザー${new Date().getSeconds().toString().slice(-2)}`
  const customer = await stripe.customers.create({
    name: customerName
  })

  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card'],
    customer: customer.id
  });

  return {
    props: {
      customerName: customerName,
      id: customer.id,
      clientSecret: setupIntent.client_secret
    }
  }
}

export default RegisterPage
