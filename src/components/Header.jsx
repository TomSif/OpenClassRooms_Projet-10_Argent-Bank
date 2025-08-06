import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import argentBankLogo from '../assets/img/argentBankLogo.png'

const Header = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
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
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {user?.firstName || 'User'}
            </Link>
            <button 
              className="main-nav-item" 
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header