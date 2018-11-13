import React, { Component } from 'react';
import { store, fetchProducts, addProduct, removeProduct } from '../store';
import SingleProduct from './SingleProduct';
import NewProductForm from './NewProductForm';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const storeState = store.getState();
      this.setState({
        products: storeState.products,
      });
    });
    store.dispatch(fetchProducts());
  }

  addProduct(product) {
    store.dispatch(addProduct(product));
  }

  removeProduct(product) {
    store.dispatch(removeProduct(product));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <h1>Product List</h1>
        {this.state.products.map(product => {
          return (
            <SingleProduct
              key={product.id}
              product={product}
              removeProduct={this.removeProduct}
            />
          );
        })}
        <div>
          <NewProductForm addProduct={this.addProduct} />
        </div>
      </div>
    );
  }
}

export default ProductList;
