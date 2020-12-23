import * as React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import stripePromise from '../../lib/loadStripe'
import { CustomerContext } from '../../context/CustomerContext'
import { POST } from '../../lib/axios'
import Layout from '../../component/Layout'
import styles from '../../styles/Home.module.css'
import CardInputForm from '../../component/CardInputForm'

const RegisterPage = () => {
  const { customerState, customerSetter } = React.useContext(CustomerContext)
  const [name, setName] = React.useState('名無しさん')
  const [loading, setLoading] = React.useState(false)

  const registerCustomer = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await POST('/api/register-customer', { customerName: name })
    customerSetter({
      name: result.name,
      id: result.id,
      client_secret: result.client_secret
    })
    setLoading(false)
  }

  return (
    <Layout>
      <main className={styles.main}>
        {customerState.client_secret ? (
          <div>
            <h4>こちら↓からクレジットカードを登録してください</h4>
            <p>**テスト用の番号 "4242424242424242" を使用してください**</p>
            {loading ? (
              '登録中...'
            ):(
              <Elements stripe={stripePromise}>
                <CardInputForm clientSecret={customerState.client_secret} customerName={customerState.name}/>
              </Elements >
            )}
          </div>
        ) : (
          <div>
            <h4>お客様のお名前を登録してください</h4>
            <form onSubmit={(e) => registerCustomer(e)}>
              <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}></input>
              <button>名前を登録する</button>
            </form>
          </div>
        )}
      </main>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
    }
  }
}

export default RegisterPage
