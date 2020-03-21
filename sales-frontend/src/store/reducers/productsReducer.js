import {
  PRODUCTS_FETCH_REQUEST,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_FAILURE,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_FETCH_FAILURE,
  CATEGORIES_FETCH_REQUEST,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE
} from "../actions/actionsTypes";

const initialState = {
  categories: [],
  products: [],
  product: [],
  error: null,
  loading: false,
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_FETCH_REQUEST:
      return { ...state, loading: true };
    case PRODUCTS_FETCH_SUCCESS:
      return { ...state, products: action.data, loading: false };
    case PRODUCTS_FETCH_FAILURE:
      return {
        ...state,
        error: action.error,
        show: true,
        loading: false
      };
    case PRODUCT_FETCH_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_FETCH_SUCCESS:
      return { ...state, product: action.data, loading: false };
    case PRODUCT_FETCH_FAILURE:
      return {
        ...state,
        error: action.error,
        show: true,
        loading: false
      };
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false };
    case PRODUCT_CREATE_FAILURE:
      return {
        ...state,
        error: action.error,
        show: true,
        loading: false
      };
    case CATEGORIES_FETCH_REQUEST:
      return { ...state, loading: true };
    case CATEGORIES_FETCH_SUCCESS:
      return { ...state, categories: action.data, loading: false };
    case CATEGORIES_FETCH_FAILURE:
      return {
        ...state,
        error: action.error,
        show: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
