import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions/usersActions";
import AnonymousMenu from "./AnonymousMenu";
import UserMenu from "./UserMenu";

const NavBar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  return (
    <header className="w-100">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src="https://p.w3layouts.com/demos/port/web/images/logo.png"
              alt="logo"
              style={{ marginLeft: "-20px" }}
            />
          </NavLink>
          <div className="navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              {!user ? (
                <AnonymousMenu />
              ) : (
                <UserMenu
                  user={user}
                  clicked={isClicked}
                  click={() => setIsClicked(!isClicked)}
                  close={() => setIsClicked(false)}
                  logout={() => dispatch(logoutUser())}
                />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
