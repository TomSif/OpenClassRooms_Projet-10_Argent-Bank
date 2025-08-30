import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserName } from "../features/auth/authSlice";

/**
 * Composant de formulaire d'édition du profil utilisateur
 * Permet de modifier le userName (éditable) et affiche firstName/lastName (lecture seule)
 * @param {Object} props - Props du composant
 * @param {Object} props.user - Données du profil utilisateur depuis l'API
 * @param {string} props.newUserName - Valeur actuelle du champ userName
 * @param {Function} props.setNewUserName - Setter pour mettre à jour newUserName
 * @param {Function} props.onSave - Callback de sauvegarde du formulaire
 * @param {Function} props.onCancel - Callback d'annulation de l'édition
 * @param {boolean} props.isLoading - État de chargement pour désactiver le bouton save
 * @returns {JSX.Element} Formulaire d'édition avec champs éditable et lecture seule
 */

const EditForm = ({
  user,
  newUserName,
  setNewUserName,
  onSave,
  onCancel,
  isLoading,
}) => (
  <div>
    <h1>Edit user info</h1>
    <form onSubmit={onSave} className="userName-form">
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

      {/* Champs en lecture seule - données venant de l'API */}
      <div className="input-wrapper">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={user?.firstName || ""}
          disabled
          style={{ backgroundColor: "#f0f0f0" }}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={user?.lastName || ""}
          disabled
          style={{ backgroundColor: "#f0f0f0" }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button type="submit" className="edit-button" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          className="edit-button"
          onClick={onCancel}
          style={{ backgroundColor: "#6c757d" }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

/**
 * Composant d'affichage du profil utilisateur
 * Mode lecture avec message de bienvenue et bouton d'édition
 * @param {Object} props - Props du composant
 * @param {Object} props.user - Données du profil utilisateur
 * @param {Function} props.onEditClick - Callback pour passer en mode édition
 * @returns {JSX.Element} Affichage du profil avec bouton d'édition
 */
const ProfileDisplay = ({ user, onEditClick }) => (
  <div>
    <h1>
      Welcome back
      <br />
      {user?.firstName} {user?.lastName || user?.userName}!
    </h1>
    <button className="edit-button" onClick={onEditClick}>
      Edit Name
    </button>
  </div>
);

/**
 * Composant principal de gestion du profil utilisateur
 * Gère l'affichage et l'édition du profil avec basculement entre les modes
 * Charge automatiquement le profil depuis l'API au montage
 * @returns {JSX.Element} Interface complète de gestion du profil
 */
const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  /** @type {boolean} État pour basculer entre mode affichage/édition */
  const [isEditing, setIsEditing] = useState(false);

  /** @type {string} Valeur temporaire du userName pendant l'édition */
  const [newUserName, setNewUserName] = useState("");

  /**
   * Effect pour charger le profil utilisateur au montage
   * Se déclenche uniquement si les données user ne sont pas déjà présentes
   */
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  /**
   * Effect pour initialiser newUserName avec la valeur actuelle
   * Se déclenche quand les données user arrivent de l'API
   */
  useEffect(() => {
    if (user?.userName) {
      setNewUserName(user.userName);
    }
  }, [user]);

  /**
   * Gestionnaire pour passer en mode édition
   * Initialise newUserName avec la valeur actuelle du user
   */
  const handleEditClick = () => {
    setIsEditing(true);
    setNewUserName(user?.userName || "");
  };

  /**
   * Gestionnaire de sauvegarde des modifications
   * Valide que la nouvelle valeur est différente avant d'envoyer la requête
   * Ferme automatiquement le mode édition après traitement
   * @param {Event} e - Event de soumission du formulaire
   */
  const handleSave = (e) => {
    e.preventDefault();
    // Ne sauvegarder que si la valeur a changé et n'est pas vide
    if (newUserName.trim() && newUserName !== user?.userName) {
      dispatch(updateUserName(newUserName.trim()));
    }
    setIsEditing(false);
  };

  /**
   * Gestionnaire d'annulation de l'édition
   * Restore la valeur originale et ferme le mode édition
   */
  const handleCancel = () => {
    setNewUserName(user?.userName || "");
    setIsEditing(false);
  };

  // États de chargement et d'erreur
  if (isLoading && !user) {
    return (
      <div className="header">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="header">
        <h1>Error loading profile: {error}</h1>
      </div>
    );
  }

  return (
    <div className="header">
      {isEditing ? (
        <EditForm
          user={user}
          newUserName={newUserName}
          setNewUserName={setNewUserName}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      ) : (
        <ProfileDisplay user={user} onEditClick={handleEditClick} />
      )}
    </div>
  );
};

export default UserProfile;
