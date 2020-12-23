import styles from '../../../styles/Home.module.css'
import stripe from '../../../lib/stripe'
import Layout from '../../../component/Layout'

const RegisterPage = (props) => {
  return (
    <Layout>
      <main className={styles.main}>
        <h2>店舗画面</h2>
        <div className={styles.grid}>
            <a href={props.loginLinkUrl} className={styles.card}>
              <h3>店舗の口座情報を確認する</h3>
            </a>
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const accountId = ctx.query.id
  const loginLink = await stripe.accounts.createLoginLink(accountId)

  return {
    props: {
      loginLinkUrl: loginLink.url
    }
  }
}

export default RegisterPage
