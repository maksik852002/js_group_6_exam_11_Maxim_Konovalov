import React from "react";
import { NavLink } from "react-router-dom";

const AnonymousMenu = () => (
  <>
    <li className="nav-item">
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/Register">
        Register
      </NavLink>
    </li>
  </>
);

export default AnonymousMenu;
