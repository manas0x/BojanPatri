import React, { useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import MenuItem from '../components/MenuItem'

const MenuView = ({ config, activeCategory, setActiveCategory, categories, filteredMenu, onAddToCart, onProductClick, unavailableItems }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const finalMenu = filteredMenu.filter(item =>
        item.itemname.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="animate-fade-in">
            <div className="px-4 mb-6">
                <h2 className="text-3xl font-black text-app-text py-2 tracking-tighter uppercase leading-none mb-2">
                    Delicious Finds
                </h2>
                <div className="relative mt-4">
                    <input
                        type="text"
                        placeholder="Search our menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-app-surface/80 border border-app-border rounded-2xl py-4 pl-12 pr-4 text-app-text placeholder-app-muted focus:border-indigo-500 outline-none transition-all shadow-lg text-sm"
                    />
                    <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-app-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {finalMenu.length === 0 ? (
                <div className="text-center py-20 px-10">
                    <div className="text-app-muted/20 font-black text-5xl mb-4 italic">404</div>
                    <p className="text-app-muted font-bold uppercase tracking-widest text-[10px]">No flavors found for your search</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-8 pb-20">
                    {finalMenu.map((item, index) => (
                        <MenuItem
                            key={index}
                            item={{ ...item, isUnavailable: unavailableItems.includes(item.itemname) }}
                            onAddToCart={onAddToCart}
                            onClick={() => onProductClick(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MenuView
