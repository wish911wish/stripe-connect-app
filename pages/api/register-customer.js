import stripe from '../../lib/stripe'

export default async (req, res) => {
  try {
    const customerName = req.body.customerName

    // Stripeに顧客のアカウント情報を登録する
    const customer = await stripe.customers.create({
      name: customerName
    })
  
    // クレジットカード登録用のセットアップを行う
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['card'],
      customer: customer.id
    });
  
    // フロント側にclient_secretを渡す
    res.statusCode = 201
    res.json({
        id: customer.id,
        name: customer.name,
        client_secret: setupIntent.client_secret
    })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      error: err.message
    });
  }
}
