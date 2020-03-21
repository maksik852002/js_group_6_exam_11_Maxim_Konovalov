import React from "react";
import { NavLink } from "react-router-dom";
import { apiURL } from "../../constants";
import "./Product.css";

const Product = ({ title, image, price, id }) => {
  const path = apiURL + "/uploads/" + image;
  return (
    <div className="card my-3 mx-auto" style={{ maxWidth: "740px" }}>
      <div className="row no-gutters p-3">
        <div className="col-md-3">
          <img src={image && path} className="card-img" alt={title} />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <NavLink className="nav-link" to={`/products/${id}`}>
              <h3 className="card-title">{title}</h3>
            </NavLink>
            <p className="card-text">
              <small className="text-muted">
                <b>{price}</b> сом
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
