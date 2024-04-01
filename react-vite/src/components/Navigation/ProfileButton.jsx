import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaShoppingCart } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  // const handleCartClick = () => {
  //   alert("Feature coming soon!");
  // };

  return (
    <div className="profile-button">
      <div className="profile-container">
        <div className="profile-info" onClick={toggleMenu}>
          <p className="greeting">
            {user ? `Hello, ${user?.username}` : `Hello, Guest`}
          </p>
          <p className="account-list">Account & List</p>
        </div>
        {/* <div>
          <FaShoppingCart
            className="shopping-cart-icon"
            onClick={handleCartClick}
          />
        </div> */}
      </div>
      {showMenu && (
        <div className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <div className="profile-username">{user.username}</div>
              <div className="profile-email">{user.email}</div>
              <hr className="profile-divider" />
              <div
                className="profile-menu-item"
                onClick={() => {
                  navigate(`/products/current`);
                  closeMenu();
                }}
              >
                Manage Products
              </div>
              <div
                className="profile-menu-item"
                onClick={() => {
                  navigate(`/new-product`);
                  closeMenu();
                }}
              >
                Create Product Listing
              </div>
              <hr className="profile-divider" />
              <div className="profile-menu-item">
                <button onClick={logout}>Log Out</button>
              </div>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
