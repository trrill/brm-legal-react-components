import React, { useCallback } from 'react';
import DOMPurify from 'dompurify';
import './LayoutListItem.css';

const LayoutListItem = React.forwardRef(({ item, layout }, ref) => {
    const title = typeof item.post.post_title === 'string' ? item.post.post_title : '';
    const categoriesReadable = (item.categories) ? item.categories.map(category => category.slug).join(', ') : '';

    function ItemDescription({ content }) {
        const cleanHTML = DOMPurify.sanitize(content);
        return <p className='text-sm text-gray-600' dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
    }

    const description = item.post.post_excerpt !== '' ? item.post.post_excerpt : item.post.post_content;

    const handleItemClick = useCallback(() => {
        if (layout === 'list' && window.innerWidth < 768) {
            window.location = (item.post.guid) ? item.post.guid : item.post.permalink;
        }
    }, [layout, item.post.guid]); 

    return (
        <div ref={ref} 
            className={`item-item bg-white md:text-center p-2 mb-2 hover:grayscale-0 rounded md:rounded-lg shadow-lg flex 
                ${layout === 'list' ? 'justify-between': ''} 
                ${layout === 'list' && window.innerWidth < 768 ? 'cursor-pointer':''}
                `} 
                key={item.id} 
                
                
                onClick={handleItemClick}
        >
            <div className='item-item-data text-left flex flex-col justify-center md:pl-4 pr-6 py-2'>
                <h2 className='text-lg '>
                    <a 
                        href={item.post.permalink} 
                        className='hover:underline'
                    >
                        {title}
                    </a>
                </h2>
                {description && (
                    <div className="md:mt-2">
                        <ItemDescription content={description} />
                    </div>
                )}
            </div>
            <div className={`flex items-center ${layout === 'list' ? 'w-1/5 self-stretch items-center flex-none' : ''}`}>
                <a 
                    href={item.post.guid} 
                    title={`Learn more about ${title}`}
                    className={`block md:h-full md:overflow-hidden`}
                >
                    <img src={item.featured_image_url} className='md:w-full md:h-full md:object-contain' alt={title} />
                </a>
            </div>
        </div>
    );
});

export default LayoutListItem;
