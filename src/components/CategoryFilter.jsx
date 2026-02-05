import React from 'react'

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`flex-shrink-0 px-7 py-3 rounded-2xl text-[11px] uppercase tracking-widest font-black transition-all duration-300 border ${activeCategory === cat
                        ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/30 scale-105 active:scale-95'
                        : 'bg-app-surface/50 text-app-muted border-app-border hover:border-indigo-500/30 hover:text-app-text active:scale-95'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilter
