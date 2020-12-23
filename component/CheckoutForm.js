import {useStripe} from '@stripe/react-stripe-js';
import { POST } from '../lib/axios'
import * as React from 'react'
import styles from '../styles/Home.module.css'


const CheckoutForm = (props) => {
  const [message, setMessage] = React.useState()

  const stripe = useStripe()
    
  const handleSubmit = async () => {
    setMessage('処理中。。。')
    const result = await POST(`/api/shop/${props.shopId}/buy`, {
      customer_id: props.customerId,
      item: props.item
    })

    const confirm_result = window.confirm('選択した商品を購入します。よろしいですか？');

    if (confirm_result) {
      const paymentResult = await stripe.confirmCardPayment(result.client_secret)
      if (paymentResult.error) {
        setMessage('失敗しました')
      } else {
        setMessage('購入しました')
      }  
    } else {
      setMessage('')
    }
  }

  return (
    <div onClick={() => handleSubmit()}>
      <h3>{props.item.name}</h3>
      <div>¥{props.item.price}</div>
      {message && (
        <div className={styles.title}>{message}</div>
      )}
    </div>
  )
}

export default CheckoutForm
