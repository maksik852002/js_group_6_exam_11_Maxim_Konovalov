import React, { useEffect } from "react";
import PostForm from "../../components/PostForm/PostForm";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  fetchCategories
} from "../../store/actions/productsActions";
import { push } from "connected-react-router";

const AddProductForm = () => {
  const user = useSelector(state => state.users.user);
  const categories = useSelector(state => state.products.categories);
  const error = useSelector(state => state.products.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(push("/login"));
    }
    dispatch(fetchCategories());
  }, [user, dispatch]);
  return (
    <>
      <div className="border rounded mt-4 p-4">
        <h2 className="mb-4">Add New Product</h2>
        <PostForm
          onSubmit={data => dispatch(createProduct(data))}
          categories={categories}
          error={error}
        />
      </div>
    </>
  );
};

export default AddProductForm;
