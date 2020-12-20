export default async (req, res) => {
  try {

    const origin = process.env.NODE_ENV === 'development' ? `http://${req.headers.host}` : `https://${req.headers.host}`

    res.statusCode = 200
    res.json({ name: 'John Doe', return: origin })
  
  }  catch (err) {
    console.error(err)
    res.status(500).send({
      error: err.message
    });
  }
}
