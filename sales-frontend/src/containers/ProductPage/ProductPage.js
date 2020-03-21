import React, { Component } from "react";
import { connect } from "react-redux";
import { apiURL } from "../../constants";
import {
  fetchProduct,
  deleteProduct
} from "../../store/actions/productsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import { MdDeleteForever } from "react-icons/md";

class PostPage extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const { product, user, loading, deleteProduct } = this.props;
    const path = apiURL + "/uploads/" + product.image;
    let check;
    product.user && user && (check = product.user._id === user._id);
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="border p-3 mt-4">
            {check && (
              <button
                onClick={() => deleteProduct(this.props.match.params.id)}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <MdDeleteForever size="30px" />
              </button>
            )}
            <h3 className="text-center py-4">{product.title}</h3>
            <div className="d-flex">
              <div className="col-6">
                <img
                  src={path}
                  className="card-img-top"
                  alt={postMessage.title}
                />
              </div>
              <div className="col-6">
                <div>
                  <h5>Информация о продавце</h5>
                  <ul>
                    <li>Имя: {product.user && product.user.name}</li>
                    <li>Телефон: {product.user && product.user.phone}</li>
                  </ul>
                  <h5>Информация о товаре</h5>
                  <ul>
                    <li>
                      Категория: {product.category && product.category.title}
                    </li>
                    <li>
                      Цена: <b>{product.price}</b> сом
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-center py-4">{product.description}</p>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.product,
    user: state.users.user,
    loading: state.products.loading,
    error: state.products.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    deleteProduct: id => dispatch(deleteProduct(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
