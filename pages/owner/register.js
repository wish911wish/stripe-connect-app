import { useRouter } from 'next/router'
import Layout from '../../component/Layout'
import styles from '../../styles/Home.module.css'
import { POST } from '../../lib/axios'

const RegisterPage = () => {
  const router = useRouter()

  const getSetLink = async () => {
    const result = await POST('/api/create-connect-account', { name: 'test', email: 'test@mail.com'})
    await router.push(result.url)
  }

  return (
    <Layout>
      <main className={styles.main}>
        <h2>店舗オーナー用のメニュー</h2>
        <div className={styles.grid}>	
          <div className={styles.card} onClick={() => getSetLink()}>
            <p>店舗の銀行口座を登録する</p>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {}
  }
}

export default RegisterPage
