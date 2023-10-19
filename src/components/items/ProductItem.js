import React from 'react';

function ProductItem({ product, product_categories, customer_types }) {
	const title = typeof product.title.rendered === 'string' ? product.title.rendered : '';

  return (
    <div className="product-item" key={product.id} product_categories={product_categories} customer_types={customer_types}>
      <h3>
		<a 	href={product.link} 
				style={{ backgroundImage: `url(${product.featured_image})` }}
				title={`Learn more about ${title}`}>
			{title}
		</a>
	</h3>
    </div>
  );
}

export default ProductItem;
