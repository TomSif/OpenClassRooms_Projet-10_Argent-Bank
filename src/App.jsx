import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepages'
import SignInPage from './pages/SignInPage'
import User from './pages/User'
// Ajoute d'autres pages si besoin

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/user" element={<User />} />
      {/* Ajoute d'autres routes ici */}
    </Routes>
  )
}

export default App