import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../../../component/Layout'
import stripe from '../../../lib/stripe'

const RegisterPage = (props) => {
  return (
    <Layout>
      <main className={styles.main}>
        <h2>口座が登録された店舗一覧</h2>
        <div className={styles.grid}>
          {props.shopList.map((shop, index) =>
          <Link href="/owner/shop/[id]" as={`/owner/shop/${shop.id}`}>
            <a className={styles.card}>
              <h3>{shop.business_profile.name || `名無しのショップ${index}`}</h3>
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
