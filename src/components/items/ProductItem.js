import React, {useRef} from 'react';
import './ProductItem.css';

function ProductItem({ product, layout }) {
	const productItemRef = useRef(null);
	const title = typeof product.post.post_title === 'string' ? product.post.post_title : '';
	const categoriesReadable = product.categories.map(category => category.slug).join(', ');
	const description = product.post.post_excerpt!=='' ? product.post.post_excerpt : product.post.post_content;
	
	return (
		<div ref={productItemRef} 
			className={`product-item md:text-center p-4 md:p-2 mb-2 hover:grayscale-0 md:rounded-lg md:shadow-lg flex ${layout === 'grid' ? '' : ' justify-between'}`} 
				key={product.id} 
				categories={categoriesReadable} 		
				customers={product.customers}
			>
			<div className='product-item-data text-left flex flex-col justify-center md:pl-4 pr-6 py-2'>
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
			<div className={`flex items-center ${layout === 'list' ? 'w-1/5 self-stretch items-center flex-none' : ''}`}>
			<a 
				href={product.post.guid} 
				title={`Learn more about ${title}`}
				className={`block md:h-full md:overflow-hidden`}
				>
					<img src={product.featured_image_url} className='md:w-full md:h-full md:object-contain' alt={title} />
			</a>
			</div>
		</div>
	);
}

export default ProductItem;
