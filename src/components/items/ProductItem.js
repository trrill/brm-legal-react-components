import React, {useRef} from 'react';
import './ProductItem.css';

function ProductItem({ product, layout }) {
	const productItemRef = useRef(null);
	const title = typeof product.post.post_title === 'string' ? product.post.post_title : '';
	const categoriesReadable = product.categories.map(category => category.slug).join(', ');
	
	return (
		<div ref={productItemRef} 
			className={`product-item lg:text-center p-2 mb-2 lg:grayscale hover:grayscale-0 lg:rounded-lg lg:shadow-lg ${layout === 'grid' ? 'lg:w-1/4' : 'flex justify-between'}`} 
				key={product.id} 
				categories={categoriesReadable} 		
				customers={product.customers}
			>
			<div className='product-item-data text-left flex flex-col justify-center pr-4'>
				<h2 className='text-lg '>
					<a 
						href={product.post.guid} 
						className='hover:underline'
						>
							{title}
					</a>
				</h2>
				<p className="lg:mt-2">
						{ product.post.post_excerpt!=='' ? product.post.post_excerpt : product.post.post_content }
				</p>
			</div>
			<a 
				href={product.post.guid} 
				title={`Learn more about ${title}`}
				className={`lg:block lg:h-full lg:overflow-hidden ${layout === 'list' ? 'w-1/5' : ''}`}
				>
					<img src={product.featured_image_url} className='lg:w-full lg:h-full lg:object-contain' alt={title} />
			</a>
			
		</div>
	);
}

export default ProductItem;
