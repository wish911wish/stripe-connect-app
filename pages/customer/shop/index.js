import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import stripe from '../../../lib/stripe'
import Layout from '../../../component/Layout'

const RegisterPage = (props) => {
  return (
    <Layout>
      <main className={styles.main}>
        <h2>店舗一覧</h2>
        <div className={styles.grid}>
          {props.shopList.map((shop, index) =>
          <Link href="/customer/shop/[id]" as={`/customer/shop/${shop.id}`}>
            <a className={styles.card}>
              <h3>{shop.business_profile.name || `名無しの店舗その${index + 1}`}</h3>
            </a>
          </Link>
          )}
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const shopData = await stripe.accounts.list()
  const activeShop = shopData.data.filter((s) => s.charges_enabled)

  return {
    props: {
      shopList: activeShop,
    }
  }
}

export default RegisterPage
