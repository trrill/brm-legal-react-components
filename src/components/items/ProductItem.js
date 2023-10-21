import React, {useRef} from 'react';
import './ProductItem.css';

function ProductItem({ product, layout }) {
	const productItemRef = useRef(null);
	const title = typeof product.post.post_title === 'string' ? product.post.post_title : '';
	const categoriesReadable = product.categories.map(category => category.slug).join(', ');
	const description = product.post.post_excerpt!=='' ? product.post.post_excerpt : product.post.post_content;
	
	return (
		<div ref={productItemRef} 
			className={`product-item md:text-center p-2 mb-2  hover:grayscale-0 md:rounded-lg md:shadow-lg ${layout === 'grid' ? '' : 'flex justify-between'}`} 
				key={product.id} 
				categories={categoriesReadable} 		
				customers={product.customers}
			>
			<div className='product-item-data text-left flex flex-col justify-center pl-4 pr-6 py-2'>
				<h2 className='text-lg '>
					<a 
						href={product.post.guid} 
						className='hover:underline'
						>
							{title}
					</a>
				</h2>
				{description && (
					<p className="md:mt-2">
						{description}
					</p>
				)}
			</div>
			<a 
				href={product.post.guid} 
				title={`Learn more about ${title}`}
				className={`md:block md:h-full md:overflow-hidden ${layout === 'list' ? 'w-1/5' : ''}`}
				>
					<img src={product.featured_image_url} className='md:w-full md:h-full md:object-contain' alt={title} />
			</a>
			
		</div>
	);
}

export default ProductItem;
