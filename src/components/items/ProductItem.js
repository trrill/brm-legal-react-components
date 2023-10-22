import React, { useEffect, useCallback } from 'react';
import './ProductItem.css';

const ProductItem = React.forwardRef(({ product, layout }, ref) => {
    const title = typeof product.post.post_title === 'string' ? product.post.post_title : '';
    const categoriesReadable = product.categories.map(category => category.slug).join(', ');
    const description = product.post.post_excerpt !== '' ? product.post.post_excerpt : product.post.post_content;

    const handleItemClick = useCallback(() => {
        if (layout === 'list' && window.innerWidth < 768) {
            window.location = product.post.guid;
        }
    }, [layout, product.post.guid]); 

    /*
    useEffect(() => {
        const handleResize = () => {
            // Here, you can add logic that should run on window resize, if any.
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup: Remove the resize event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    */

    return (
        <div ref={ref} 
            className={`product-item bg-white md:text-center p-2 mb-2 hover:grayscale-0 rounded md:rounded-lg shadow-lg flex 
                ${layout === 'list' ? 'justify-between': ''} 
                ${layout === 'list' && window.innerWidth < 768 ? 'cursor-pointer':''}
                `} 
                key={product.id} 
                categories={categoriesReadable} 
                customers={product.customers} 
                onClick={handleItemClick}
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
});

export default ProductItem;
