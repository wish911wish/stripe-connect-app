import '../styles/globals.css'

import { CustomerProvider } from '../context/CustomerContext'


function MyApp({ Component, pageProps }) {
  return (
    <CustomerProvider>
      <Component {...pageProps} />
    </CustomerProvider>
  )
}

export default MyApp
