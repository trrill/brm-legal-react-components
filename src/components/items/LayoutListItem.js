import React, { useCallback } from 'react';
import DOMPurify from 'dompurify';
import './LayoutListItem.css';

const LayoutListItem = React.forwardRef(({ item, layout }, ref) => {
    const title = typeof item.post.post_title === 'string' ? item.post.post_title : '';
    //const categoriesReadable = (item.categories) ? item.categories.map(category => category.slug).join(', ') : '';

    

    function ItemDescription({ content }) {
        const cleanHTML = DOMPurify.sanitize(content);
        return <p className='text-sm text-gray-600' dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
    }

    const description = item.post.post_excerpt !== '' ? item.post.post_excerpt : item.post.post_content;

    const link = item.post.guid ? item.post.guid : item.post.permalink;
    console.log('link', link);

    const handleItemClick = useCallback(() => {
        if (layout === 'list' && window.innerWidth < 768) {
            window.location = link;
        }
    }, [layout, link]); 

    return (
        <div ref={ref} 
            className={`item-item bg-white md:text-center p-2 mb-2 hover:grayscale-0 rounded md:rounded-lg shadow-lg flex 
                ${layout === 'list' ? 'justify-between': ''} 
                ${layout === 'list' && window.innerWidth < 768 ? 'cursor-pointer':''}
                `} 
                key={item.ID} 
                onClick={handleItemClick}
        >
            <div className='item-item-data text-left flex flex-col justify-center md:pl-4 pr-6 py-2'>
                <h2 className='text-lg '>
                    <a 
                        href={link} 
                        className='hover:underline'
                    >
                        {title}
                    </a>
                </h2>
                <ItemDescription content={description} />
            </div>
            <div className={`flex w-full items-center text-center ${layout === 'list' ? 'w-1/5 self-stretch items-center flex-none' : ''}`}>
                <a 
                    href={link} 
                    title={`Learn more about ${title}`}
                    className={`flex md:h-full md:overflow-hidden w-full items-center justify-center`}
                >
                    {(item.featured_image_url && item.featured_image_url !== '') && (
                        <img src={item.featured_image_url} className='md:w-full md:h-full md:object-contain' alt={title} />
                    )}

                    {(!item.featured_image_url || item.featured_image_url === '') && title}
                        
                </a>
            </div>
        </div>
    );
});

export default LayoutListItem;
