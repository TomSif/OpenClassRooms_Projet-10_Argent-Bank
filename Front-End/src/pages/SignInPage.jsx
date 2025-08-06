import { Link } from 'react-router-dom'
import Login from '../components/Login'
import Header from '../components/Header'
import Footer from '../components/Footer';
import '../css/main.css'

function SignInPage() {
  return (
    <>
      <Header />
      
      <main className="main bg-dark">
        <Login />
      </main>
      
      <Footer />
    </>
  )
}

export default SignInPage