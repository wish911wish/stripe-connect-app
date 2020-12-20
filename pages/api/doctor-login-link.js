import stripe from '../../lib/stripe'

export default async (req, res) => {
  try {
    const accounts = await stripe.accounts.list()
    const accountData = []
    accounts.data.forEach(account => {
      accountData.push({
        loginUrl: account.login_links.url
      })
    });
  
    res.statusCode = 200
    res.json({ accountData: accountData })
  } catch (err) {
    console.error(err)
    res.status(500).send({
      error: err.message
    });
  }
}
