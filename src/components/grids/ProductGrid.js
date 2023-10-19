import React from 'react';
import ProductItem from '../items/ProductItem'; // Assuming you have a ProductItem component

function ProductGrid({ products, currentFilter }) {

  const filteredProducts = products.filter((product) => {
    const productCategories = product.categories || [];
    const productCustomers = product.customers || [];
  
    const matchesCategories =
      currentFilter.productCategories.length === 0 ||
      currentFilter.productCategories.some((category) =>
        productCategories.includes(category)
      );
  
    const matchesCustomers =
      currentFilter.customers.length === 0 ||
      currentFilter.customers.some((customer) =>
        productCustomers.includes(customer)
      );
  
    return matchesCategories && matchesCustomers;
  });  

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} product_categories={product.product_categories} customer_types={product.customer_types} />
      ))}
    </div>
  );
}

export default ProductGrid;
