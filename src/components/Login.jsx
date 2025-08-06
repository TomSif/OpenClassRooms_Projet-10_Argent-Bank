// src/components/Login.jsx
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, clearError } from '../features/auth/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth)

  // Redirection après connexion réussie
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user')
    }
  }, [isAuthenticated, navigate])

  // Nettoyage des erreurs au démontage
  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      return
    }
    
    dispatch(loginUser({ email, password }))
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        
        {error && (
          <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          className="sign-in-button"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </section>
  )
}

export default Login