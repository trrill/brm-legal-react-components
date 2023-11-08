import React, { useState, useEffect, useCallback, forwardRef, ForwardedRef } from 'react';
import DOMPurify from 'dompurify';
import { debounce } from '../../utils/utils';
import './LayoutListItem.css';

// Define the shape of the item object based on what you expect.
interface Post {
  post_title: string;
  post_excerpt: string;
  post_content: string;
  guid: string;
  permalink: string;
}

interface Item {
  ID: number;
  post: Post;
  featured_image_url?: string;
}

type LayoutListItemProps = {
  item: Item;
  layout: string;
};

type ItemDescriptionProps = {
  content: string;
};

const ItemDescription = ({ content }: ItemDescriptionProps) => {
  const cleanHTML = DOMPurify.sanitize(content);
  return <p className='text-sm text-gray-600' dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

const LayoutListItem = forwardRef<HTMLDivElement, LayoutListItemProps>(({ item, layout }, ref: ForwardedRef<HTMLDivElement>) => {
  const title = item.post.post_title;
  const description = item.post.post_excerpt !== '' ? item.post.post_excerpt : item.post.post_content;
  const link = item.post.guid || item.post.permalink;

  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = debounce(() => {
      setViewportWidth(window.innerWidth);
    }, 250); // Debounce time in milliseconds

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = useCallback(() => {
    if (layout === 'list' && viewportWidth < 768) {
      window.location.href = link;
    }
  }, [layout, link, viewportWidth]);

  const classNameLogic = `item-item bg-white md:text-center p-2 mb-2 hover:grayscale-0 rounded md:rounded-lg shadow-lg flex ${layout === 'list' ? 'justify-between' : ''} ${layout === 'list' && viewportWidth < 768 ? 'cursor-pointer' : ''}`;

  return (
    <div
      ref={ref}
      className={classNameLogic}
      onClick={handleItemClick}
    >
      <div className='item-item-data text-left flex flex-col justify-center md:pl-4 pr-6 py-2'>
        <h2 className='text-lg'>
          <a href={link} className='hover:underline'>
            {title}
          </a>
        </h2>
        <ItemDescription content={description} />
      </div>
      <div className={`flex items-center text-center ${layout === 'list' ? 'w-1/5 self-stretch items-center flex-none' : 'w-full'}`}>
        <a href={link} title={`Learn more about ${title}`} className={`flex md:h-full md:overflow-hidden w-full items-center justify-center`}>
          {item.featured_image_url && <img src={item.featured_image_url} className='md:w-full md:h-full md:object-contain' alt={title} />}
          {!item.featured_image_url && title}
        </a>
      </div>
    </div>
  );
});

export default LayoutListItem;
