import React from "react";
import { NavLink } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = ({ click, close, user, clicked, logout }) => {
  let menu = "dropdown-menu dropdown-menu-right";
  clicked && (menu += " show");
  return (
    <li className="d-flex nav-link">
      <div className="dropdown mr-1">
        <span
          onClick={click}
          className="nav-link dropdown-toggle dropdown-title"
        >
          Hello, <b>{user.username}</b> !
        </span>
        <div onClick={close} className={menu} style={{ marginTop: "20px" }}>
          <NavLink className="dropdown-item" to={`/product-add`}>
            Add new product
          </NavLink>
          <div className="dropdown-divider"></div>
          <span
            onClick={logout}
            className="dropdown-item"
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        </div>
      </div>
    </li>
  );
};

export default UserMenu;
