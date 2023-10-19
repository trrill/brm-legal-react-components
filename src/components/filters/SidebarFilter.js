import React from 'react';

function SidebarFilter({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="filter-sidebar">
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <button
                            className={category.name === selectedCategory ? 'active' : ''}
                            onClick={() => onSelectCategory(category.name)}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SidebarFilter;
