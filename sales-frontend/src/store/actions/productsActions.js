import {
  PRODUCTS_FETCH_REQUEST,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_FAILURE,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_FETCH_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  CATEGORIES_FETCH_REQUEST,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAILURE,
  PRODUCT_DELETE_FAILURE
} from "./actionsTypes";
import axios from "../../axiosBase";
import { push } from "connected-react-router";

export const categoriesFetchRequest = () => ({
  type: CATEGORIES_FETCH_REQUEST
});
export const categoriesFetchSuccess = data => ({
  type: CATEGORIES_FETCH_SUCCESS,
  data
});
export const categoriesFetchFailure = error => ({
  type: CATEGORIES_FETCH_FAILURE,
  error
});

export const productsFetchRequest = () => ({ type: PRODUCTS_FETCH_REQUEST });
export const productsFetchSuccess = data => ({
  type: PRODUCTS_FETCH_SUCCESS,
  data
});
export const productsFetchFailure = error => ({
  type: PRODUCTS_FETCH_FAILURE,
  error
});

export const productFetchRequest = () => ({ type: PRODUCT_FETCH_REQUEST });
export const productFetchSuccess = data => ({
  type: PRODUCT_FETCH_SUCCESS,
  data
});
export const productFetchFailure = error => ({
  type: PRODUCT_FETCH_FAILURE,
  error
});

export const productCreateRequest = () => ({ type: PRODUCT_CREATE_REQUEST });
export const productCreateSuccess = () => ({ type: PRODUCT_CREATE_SUCCESS });
export const productCreateFailure = error => ({
  type: PRODUCT_CREATE_FAILURE,
  error
});

export const productDeleteFailure = error => ({
  type: PRODUCT_DELETE_FAILURE,
  error
});

export const fetchCategories = () => {
  return async dispatch => {
    try {
      dispatch(categoriesFetchRequest());
      const response = await axios.get("/categories");
      dispatch(categoriesFetchSuccess(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(categoriesFetchFailure(e.response.data));
      } else {
        dispatch(
          categoriesFetchFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const fetchProducts = query => {
  return async dispatch => {
    try {
      let response;
      dispatch(productsFetchRequest());
      if (!query || query === "?category=undefined") {
        response = await axios.get(`/products/`);
      } else {
        response = await axios.get(`/products/${query}`);
      }
      dispatch(productsFetchSuccess(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(productsFetchFailure(e.response.data));
      } else {
        dispatch(
          productsFetchFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const fetchProduct = id => {
  return async dispatch => {
    try {
      dispatch(productFetchRequest());
      const response = await axios.get(`/products/${id}`);
      dispatch(productFetchSuccess(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(productFetchFailure(e.response.data));
      } else {
        dispatch(
          productFetchFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const createProduct = data => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const headers = { Authorization: "Token " + token };
      dispatch(productCreateRequest());
      await axios.post("/products", data, { headers });
      dispatch(productCreateSuccess());
      dispatch(push("/"));
    } catch (e) {
      if (e.response) {
        dispatch(productCreateFailure(e.response.data));
      } else {
        dispatch(
          productCreateFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const headers = { Authorization: "Token " + token };
      await axios.delete(`/products/${id}`, { headers });
      dispatch(push("/"));
    } catch (e) {
      if (e.response) {
        dispatch(productDeleteFailure(e.response.data));
      } else {
        dispatch(
          productDeleteFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};
