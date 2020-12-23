import stripe from '../../lib/stripe'

export default async (req, res) => {
  try {
    const customerName = req.body.customerName
    const customer = await stripe.customers.create({
      name: customerName
    })
  
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['card'],
      customer: customer.id
    });
  
    res.statusCode = 201
    res.json({
        customerName: customerName,
        clientSecret: setupIntent.client_secret
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      error: err.message
    });
  }
}
