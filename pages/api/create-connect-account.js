import stripe from '../../lib/stripe'

export default async (req, res) => {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'JP',
    })

    const origin = process.env.NODE_ENV === 'development' ? `http://${req.headers.host}` : `https://${req.headers.host}`

    const accountLinkURL = await generateAccountLink(account.id, origin)
  
    res.statusCode = 200
    res.json({ url: accountLinkURL })
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
}

function generateAccountLink(accountID, origin) {
  return stripe.accountLinks.create({
    type: "account_onboarding",
    account: accountID,
    refresh_url: `${origin}/onboard-user/refresh`,
    return_url: `${origin}/success`,
  }).then((link) => link.url);
}
