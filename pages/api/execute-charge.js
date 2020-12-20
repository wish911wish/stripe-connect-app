import stripe from '../../lib/stripe'

export default async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    const stripeConnectedAccountId = req.body.hospital_id

    const paymentMethodList = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    const clonedPaymentMethod = await stripe.paymentMethods.create({
      customer: customer.id,
      payment_method: paymentMethodList.data[0].id,
    }, {
      stripeAccount: stripeConnectedAccountId,
    });

    const clonedCustomer = await stripe.customers.create({
      payment_method: clonedPaymentMethod.id,
    }, {
      stripeAccount: stripeConnectedAccountId,
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'jpy',
      payment_method_types: ['card'],
      payment_method: clonedPaymentMethod.id,
      customer: clonedCustomer.id,
    }, {
      stripeAccount: stripeConnectedAccountId,
    });

    res.statusCode = 200
    res.json({ client_secret: paymentIntent.client_secret })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      error: err.message
    });
  }
}
