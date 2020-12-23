import * as React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CustomerContext } from '../../../context/CustomerContext'
import Layout from '../../../component/Layout'
import styles from '../../../styles/Home.module.css'
import CheckoutForm from '../../../component/CheckoutForm'

const RegisterPage = (props) => {
  const { customerState } = React.useContext(CustomerContext)

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    { stripeAccount: props.shopId}
  )

  return (
    <Layout>
      <main className={styles.main}>
        <h2>商品一覧</h2>
        <Elements stripe={stripePromise}>
          <div className={styles.grid}>
            {props.itemList.map((item, index) =>
              <div className={styles.card} key={index}>
                <CheckoutForm item={item} customerId={customerState.id} shopId={props.shopId} />
              </div>
            )}
          </div>
        </Elements>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const itemList = [
    {
      name: 'キノコのかさ',
      price: 100,
    },
    {
      name: 'キノコのスツール',
      price: 200
    },
    {
      name: 'キノコのかべがみ',
      price: 300
    },
  ]

  return {
    props: {
      itemList: itemList,
      shopId: ctx.query.id
    }
  }
}

export default RegisterPage
