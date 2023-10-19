import React from 'react';

function ProductItem({ product }) {
	const title = typeof product.title.rendered === 'string' ? product.title.rendered : '';

  return (
    <div className="product-item">
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
