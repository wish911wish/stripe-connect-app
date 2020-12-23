import stripe from '../../../../lib/stripe'

export default async (req, res) => {
  try {
    const item = req.body.item
    const stripeConnectedAccountId = req.query.id
    const customerId = req.body.customer_id
    // const customerId = 'cus_Ic3eY9UTUbKkDk'

    const paymentMethodData = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });


    const connectedPaymentMethod = await stripe.paymentMethods.retrieve(
      paymentMethodData.data[0].id,
      {
        stripeAccount: stripeConnectedAccountId,
      }
    ).catch((err) => err.statusCode === 404 ? null : err);

    if (connectedPaymentMethod === null) {
      const clonedPaymentMethod = await stripe.paymentMethods.create({
        customer: customer.id,
        payment_method: paymentMethodData.data[0].id,
      }, {
        stripeAccount: stripeConnectedAccountId,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: item.price,
      currency: 'jpy',
      payment_method_types: ['card'],
      payment_method: connectedPaymentMethod.id,
      customer: clonedCustomer.id,
      description: `${item.name}の購入代金`,
      metadata: {'name': item.name, 'price': item.price}
    }, {
      stripeAccount: stripeConnectedAccountId,
    });



    // const paymentMethodData = await stripe.paymentMethods.list({
    //   customer: customerId,
    //   type: 'card',
    // });

    // const clonedPaymentMethod = await stripe.paymentMethods.create({
    //   customer: customer.id,
    //   payment_method: paymentMethodData.data[0].id,
    // }, {
    //   stripeAccount: stripeConnectedAccountId,
    // });
    // console.log(clonedPaymentMethod)

    // const clonedCustomer = await stripe.customers.create({
    //   payment_method: clonedPaymentMethod.id,
    // }, {
    //   stripeAccount: stripeConnectedAccountId,
    // })
    // console.log(clonedCustomer)

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: item.price,
    //   currency: 'jpy',
    //   payment_method_types: ['card'],
    //   payment_method: clonedPaymentMethod.id,
    //   customer: clonedCustomer.id,
    //   description: `${item.name}の購入代金`,
    //   metadata: {'name': item.name, 'price': item.price}
    // }, {
    //   stripeAccount: stripeConnectedAccountId,
    // });
    // console.log(paymentIntent)

    res.statusCode = 201
    res.json({
      payment_intent: paymentIntent,
      client_secret: 'paymentIntent.client_secret'
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      error: err.message
    });
  }
}
