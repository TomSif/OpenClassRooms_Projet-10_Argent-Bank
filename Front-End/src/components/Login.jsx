// src/components/Login.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearError } from "../features/auth/authSlice";
import "../css/main.css";

/**
 * Composant de formulaire de connexion
 * Gère l'authentification utilisateur avec email/password
 * Redirige automatiquement vers /user après connexion réussie
 * @returns {JSX.Element} Formulaire de connexion avec gestion d'erreurs
 */
const Login = () => {
  /**
   * State local du formulaire
   * @type {Object}
   * @property {string} email - Email de l'utilisateur
   * @property {string} password - Mot de passe de l'utilisateur
   */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /**
   * État de la checkbox "Remember me"
   * @type {boolean}
   */
  const [rememberMe, setRememberMe] = useState(false);

  // Initialise rememberMe depuis localStorage au montage
  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe");
    if (savedRememberMe !== null) {
      setRememberMe(savedRememberMe === "true");
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  /**
   * Effect pour la redirection automatique après connexion réussie
   * Se déclenche quand isAuthenticated passe à true
   */
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  /**
   * Effect de nettoyage des erreurs au démontage du composant
   * Évite d'afficher des erreurs obsolètes lors du prochain montage
   */
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  /**
   * Gestionnaire de changement des inputs du formulaire
   * Met à jour le state formData de manière immutable
   * @param {Event} e - Event de changement de l'input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Gestionnaire de changement de la checkbox "Remember me"
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement de changement
   */
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  /**
   * Gestionnaire de soumission du formulaire
   * @param {React.FormEvent} e - Événement de soumission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    dispatch(loginUser({ ...formData, rememberMe }));
  };

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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", margin: "10px 0" }}
          >
            {error}
          </div>
        )}

        <button type="submit" className="sign-in-button" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </section>
  );
};

export default Login;
