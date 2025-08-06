import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer';
import AccountCard from '../components/AccountCard';
import UserProfile from '../components/UserProfile'
import '../css/main.css'

function User() {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  // Rediriger vers la page de connexion si pas authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in')
    }
  }, [isAuthenticated, navigate])

  // Si pas authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Header />
      
      <main className="main bg-dark">
        <UserProfile />
        
        <h2 className="sr-only">Accounts</h2>
        <AccountCard
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <AccountCard
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      
      <Footer />
    </>
  )
}

export default User