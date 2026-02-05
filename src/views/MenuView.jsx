import React, { useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import MenuItem from '../components/MenuItem'

const MenuView = ({ config, activeCategory, setActiveCategory, categories, filteredMenu, onAddToCart, onProductClick, unavailableItems }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const finalMenu = filteredMenu.filter(item =>
        item.itemname.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="animate-fade-in px-4">
            <div className="mb-8">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <p className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Handpicked for you</p>
                        <h2 className="text-3xl md:text-4xl font-black text-app-text tracking-tighter uppercase leading-none italic">
                            Delicious <span className="text-indigo-500/80">Finds</span>
                        </h2>
                    </div>
                </div>

                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search for your favorite flavors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-app-surface/40 backdrop-blur-md border border-app-border/50 rounded-2xl py-4 md:py-5 pl-12 md:pl-14 pr-6 text-app-text placeholder-app-muted focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-xl shadow-indigo-500/5 text-sm md:text-base"
                    />
                    <svg className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-app-muted group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-app-surface/80 px-2 py-1 rounded-lg border border-app-border text-[8px] font-black text-app-muted uppercase hidden md:block">Cmd + K</div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pb-10">
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
