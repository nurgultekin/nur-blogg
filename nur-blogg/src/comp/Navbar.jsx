import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { FaRegPlusSquare } from "react-icons/fa";
import { auth } from "../firebase";
import "../App.css";

const Navbar = () => {
  const { user, userName } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="text-yellow-400 font-bold text-lg font-titan-one">
          NurG
        </Link>
      </div>
      <div className="nav-links">
        {user && (
          <>
            <Link to="/Explore" className="text-white">Explore</Link>
            <Link to="/MakeBlogg" className="text-white makeBloggIcon">
              <FaRegPlusSquare />
            </Link>
            <button onClick={handleLogout} className="text-white">Logout</button>
          </>
        )}
        <Link to="/" className="text-white">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
