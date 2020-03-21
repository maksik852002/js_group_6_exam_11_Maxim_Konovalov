import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchProducts,
  fetchCategories
} from "../../store/actions/productsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Post from "../../components/Product/Product";
import Navs from "../../components/Navs/Navs";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      const query = `?category=${this.props.match.params.category}`;
      this.props.fetchProducts(query);
    }
  }

  render() {
    const { products, categories, loading } = this.props;

    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="row">
            <div className="col-3">
              <Navs categories={categories} />
            </div>
            <div className="col-9">
              {products &&
                products.map(el => (
                  <Post
                    key={el._id}
                    id={el._id}
                    title={el.title}
                    image={el.image}
                    price={el.price}
                  />
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    categories: state.products.categories,
    loading: state.products.loading,
    show: state.products.show,
    error: state.products.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: query => dispatch(fetchProducts(query)),
    fetchCategories: () => dispatch(fetchCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
