import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Products from "./containers/Products/Products";
import AddProductForm from "./containers/AddProductForm/AddProductForm";
import ProductPage from "./containers/ProductPage/ProductPage";
import RegisterForm from "./containers/RegisterForm/RegisterForm";
import LoginForm from "./containers/LoginForm/LoginForm";

const App = () => (
  <Layout>
    <Switch>
    
      <Route path="/" exact component={Products} />
      <Route path="/products/:id" exact component={ProductPage} />
      <Route path="/products/category/:category" exact component={Products} />
      <Route path="/products" component={Products} />
      <Route path="/login" component={ LoginForm } />
      <Route path="/register" component={RegisterForm} />
  
      <Route path="/product-add" component={AddProductForm} />
      <Route render={() => <h1>Not found</h1>} />
    </Switch>
  </Layout>
);

export default App;
