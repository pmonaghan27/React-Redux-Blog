import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, addProduct, removeProduct } from '../store';
import SingleProduct from './SingleProduct';
import NewProductForm from './NewProductForm';

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div>
        <h1>Product List</h1>
        {this.props.products.map(product => {
          return (
            <SingleProduct
              key={product.id}
              product={product}
              removeProduct={this.props.removeProduct}
            />
          );
        })}
        <div>
          <NewProductForm addProduct={this.props.addProduct} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
    addProduct: product => {
      dispatch(addProduct(product));
    },
    removeProduct: product => {
      dispatch(removeProduct(product));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
