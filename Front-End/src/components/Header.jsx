import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import argentBankLogo from '../assets/img/argentBankLogo.png'

// Composant pour la navigation authentifiée
const AuthenticatedNav = ({ displayName, onLogout }) => (
  <>
    <Link className="main-nav-item" to="/user">
      <i className="fa fa-user-circle"></i>
      {displayName}
    </Link>
    <button 
      className="main-nav-item" 
      onClick={onLogout}
      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <i className="fa fa-sign-out"></i>
      Sign Out
    </button>
  </>
)

// Composant pour la navigation non authentifiée
const UnauthenticatedNav = () => (
  <Link className="main-nav-item" to="/sign-in">
    <i className="fa fa-user-circle"></i>
    Sign In
  </Link>
)

const Header = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user, userName } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  // Affichage du nom : userName en priorité, sinon firstName
  const displayName = userName || user?.firstName || 'User'

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
          <AuthenticatedNav 
            displayName={displayName} 
            onLogout={handleLogout} 
          />
        ) : (
          <UnauthenticatedNav />
        )}
      </div>
    </nav>
  )
}

export default Header