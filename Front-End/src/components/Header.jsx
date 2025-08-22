import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import argentBankLogo from "../assets/img/argentBankLogo.webp";

/**
 * Composant de navigation pour utilisateur authentifié
 * Affiche le nom d'utilisateur et le bouton de déconnexion
 * @param {Object} props - Props du composant
 * @param {string} props.displayName - Nom à afficher dans la navigation (userName ou firstName)
 * @param {Function} props.onLogout - Fonction de callback pour la déconnexion
 * @returns {JSX.Element} Navigation avec profil utilisateur et bouton logout
 */
const AuthenticatedNav = ({ displayName, onLogout }) => (
  <>
    <Link className="main-nav-item" to="/user">
      <i className="fa fa-user-circle"></i>
      {displayName}
    </Link>
    <button
      className="main-nav-item"
      onClick={onLogout}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      <i className="fa fa-sign-out"></i>
      Sign Out
    </button>
  </>
);

/**
 * Composant de navigation pour utilisateur non authentifié
 * Affiche uniquement le lien de connexion
 * @returns {JSX.Element} Lien vers la page de connexion
 */
const UnauthenticatedNav = () => (
  <Link className="main-nav-item" to="/sign-in">
    <i className="fa fa-user-circle"></i>
    Sign In
  </Link>
);

/**
 * Composant Header principal de l'application
 * Gère la navigation adaptative selon l'état d'authentification
 * Affiche le logo Argent Bank et la navigation contextuelle
 * @returns {JSX.Element} Header complet avec logo et navigation
 */
const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, userName } = useSelector(
    (state) => state.auth
  );

  /**
   * Gestionnaire de déconnexion
   * Dispatch l'action logout qui nettoie le state et localStorage
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  /**
   * Logique d'affichage du nom utilisateur
   * Priorité: 1) userName personnalisé, 2) firstName du profil, 3) 'User' par défaut
   * @type {string}
   */
  const displayName = userName || user?.firstName || "User";

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
          width="200"
          height="54"
          loading="eager"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {isAuthenticated ? (
          <AuthenticatedNav displayName={displayName} onLogout={handleLogout} />
        ) : (
          <UnauthenticatedNav />
        )}
      </div>
    </nav>
  );
};

export default Header;
