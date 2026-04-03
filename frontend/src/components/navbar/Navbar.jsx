import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./navbar.css";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/" className="logo">
          🏠 RealEstatePro
        </Link>
        <Link to="/">Home</Link>
        <Link to="/list">Properties</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.png"}
              alt="avatar"
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profileBtn">
              Profile
            </Link>
          </div>
        ) : (
          <div className="auth">
            <Link to="/login">Sign In</Link>
            <Link to="/register" className="registerBtn">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
