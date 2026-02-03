import React from 'react'

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar px-4 sm:px-0 scroll-smooth">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`flex-shrink-0 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border ${activeCategory === cat
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] scale-105'
                        : 'bg-app-surface text-app-muted border-app-border hover:border-indigo-500/30 hover:text-app-text'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilter
