import {useStripe} from '@stripe/react-stripe-js';
import { POST } from '../lib/axios'
import * as React from 'react'
import styles from '../styles/Home.module.css'


const CheckoutForm = (props) => {
    const [message, setMessage] = React.useState()

    const stripe = useStripe()

    const handleSubmit = async () => {
        setMessage('送金中。。。')
        const result = await POST('/api/execute-charge', { hospital_id: props.hospitalId, email: 'test@mail.com'})
    
        const paymentResult = await stripe.confirmCardPayment(result.client_secret)
        if (paymentResult.paymentIntent.status == 'succeeded') {
            setMessage('送金が成功しました')
        } else {
            setMessage('送金が失敗しました')
        }
      }

    return (
        <>
            <div onClick={() => handleSubmit()}><h3>100円送金する</h3></div>
            {message && (
                <div className={styles.title}>{message}</div>
            )}
        </>
    )
}

export default CheckoutForm
