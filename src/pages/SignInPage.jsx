import { Link } from 'react-router-dom'
import argentBankLogo from '../assets/img/argentBankLogo.png'
import Login from '../components/Login'
import '../css/main.css'

function SignInPage() {
  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
      
      <main className="main bg-dark">
        <Login />
      </main>
      
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  )
}

export default SignInPage