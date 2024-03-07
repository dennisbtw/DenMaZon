import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../../images/DenM (2).png";
import { FaSearch } from "react-icons/fa";

function Navigation() {

  const handleSearchClick = () => {
    alert("Feature coming soon!");
  };

  const navigate = useNavigate();
  return (
    <div className="navigation-bar">
      <div className="navigation-container">
        <div className="navigation-logo">
          <img
            src={logo}
            className="denmazon-logo"
            onClick={() => navigate("/")}
            alt="Denmazon Logo"
          />
        </div>
        <div className="navigation-search" onClick={handleSearchClick}>
          <input type="text" placeholder="Search DenMaZon"/>
          <FaSearch className="search-icon" /> 
        </div>
        <div className="navigation-profile">
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
