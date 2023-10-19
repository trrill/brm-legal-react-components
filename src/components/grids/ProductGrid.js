import React from 'react';
import ProductItem from '../items/ProductItem'; // Assuming you have a ProductItem component

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
