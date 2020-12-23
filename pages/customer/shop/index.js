import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import stripe from '../../../lib/stripe'

const RegisterPage = (props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>店舗一覧</h2>
        <div className={styles.grid}>
          {props.shopList.map((shop, index) =>
          <Link href="/customer/shop/[id]" as={`/customer/shop/${shop.id}`}>
            <a className={styles.card}>
              <h3>{shop.business_profile.name || `名無しのショップ${index}`}</h3>
            </a>
          </Link>
          )}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const shopData = await stripe.accounts.list()

  return {
    props: {
      shopList: shopData.data,
    }
  }
}

export default RegisterPage
