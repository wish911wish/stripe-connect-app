import * as React from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'

const CardInputForm = (props) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('登録する')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        setMessage('登録中。。。')

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardSetup(props.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: props.customerName,
              },
            }
        });

        if (result.error) {
            setMessage('失敗しました')
        } else {
            setMessage('完了しました')
        }

        setLoading(true)
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button disabled={!stripe || loading}>{message}</button>
        </form>
    )
}

export default CardInputForm
