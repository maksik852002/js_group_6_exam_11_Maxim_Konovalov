import React from "react";
import { NavLink } from "react-router-dom";

const Navs = ({ categories }) => (
  <div className="nav flex-column nav-pills my-3">
    <NavLink className="nav-link" to={`/products`}>
      All products
    </NavLink>
    {categories.map(cat => (
      <NavLink
        className="nav-link"
        to={`/products/category/${cat._id}`}
        key={cat._id}
      >
        {cat.title}
      </NavLink>
    ))}
  </div>
);

export default Navs;
