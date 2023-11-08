import React, {  useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify';
import { debounce } from '../../utils/utils';
import './LayoutListItem.css';

const LayoutListItem = React.forwardRef(({ item, layout }, ref) => {
    const title = typeof item.post.post_title === 'string' ? item.post.post_title : '';
    const description = item.post.post_excerpt !== '' ? item.post.post_excerpt : item.post.post_content;
    const link = item.post.guid ? item.post.guid : item.post.permalink;

    function ItemDescription({ content }) {
        const cleanHTML = DOMPurify.sanitize(content);
        return <p className='text-sm text-gray-600' dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
    }

    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = debounce(() => {
            setViewportWidth(window.innerWidth);
        }, 250); // Debounce time in milliseconds

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleItemClick = useCallback(() => {
        if (layout === 'list' && viewportWidth < 768) {
            window.location = (item.post.guid) ? item.post.guid : item.post.permalink;
        }
    }, [layout, item.post.guid, item.post.permalink, viewportWidth]);

    const classNameLogic = `item-item bg-white md:text-center p-2 mb-2 hover:grayscale-0 rounded md:rounded-lg shadow-lg flex ${layout === 'list' ? 'justify-between': ''} ${layout === 'list' && viewportWidth < 768 ? 'cursor-pointer':''}`;


    return (
        <div ref={ref} 
            className={classNameLogic} 
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
            <div className={`flex items-center text-center ${layout === 'list' ? 'w-1/5 self-stretch items-center flex-none' : 'w-full'}`}>
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
