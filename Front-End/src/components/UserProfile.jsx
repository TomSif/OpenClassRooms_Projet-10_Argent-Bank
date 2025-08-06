import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserProfile, updateUserName } from '../features/auth/authSlice'

const UserProfile = () => {
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((state) => state.auth)
  
  const [isEditing, setIsEditing] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  // Charger le profil au montage du composant
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, user])

  // Initialiser le userName quand les données arrivent
  useEffect(() => {
    if (user?.userName) {
      setNewUserName(user.userName)
    }
  }, [user])

  const handleEditClick = () => {
    setIsEditing(true)
    setNewUserName(user?.userName || '')
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (newUserName.trim() && newUserName !== user?.userName) {
      dispatch(updateUserName(newUserName.trim()))
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setNewUserName(user?.userName || '')
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="header">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="header">
        <h1>Error loading profile: {error}</h1>
      </div>
    )
  }

  return (
    <div className="header">
      {isEditing ? (
        <div>
          <h1>Edit user info</h1>
          <form onSubmit={handleSave}>
            <div className="input-wrapper">
              <label htmlFor="userName">User name:</label>
              <input
                type="text"
                id="userName"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name:</label>
              <input
                type="text"
                id="firstName"
                value={user?.firstName || ''}
                disabled
                style={{ backgroundColor: '#f0f0f0' }}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="lastName"
                value={user?.lastName || ''}
                disabled
                style={{ backgroundColor: '#f0f0f0' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button 
                type="submit" 
                className="edit-button"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button 
                type="button" 
                className="edit-button"
                onClick={handleCancel}
                style={{ backgroundColor: '#6c757d' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1>
            Welcome back<br />
            {user?.firstName} {user?.lastName || user?.userName}!
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile