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
            <div className="mb-10">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <p className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Handpicked for you</p>
                        <h2 className="text-3xl md:text-5xl font-black text-app-text tracking-tighter uppercase leading-none italic">
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
                        className="w-full bg-app-surface/40 backdrop-blur-md border border-app-border/50 rounded-[1.5rem] py-5 md:py-6 pl-14 md:pl-16 pr-6 text-app-text placeholder-app-muted focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-xl shadow-indigo-500/5 text-sm md:text-base mb-10"
                    />
                    <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 -mt-5 text-app-muted group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* AI Smart Picks */}
                {!searchQuery && (
                    <div className="mt-4 mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                <span className="text-sm">✨</span>
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-app-text italic">Smart Picks <span className="text-indigo-500/40 not-italic ml-1">AI Recommendation</span></h3>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
                            {filteredMenu.filter(i => i.price > 200).slice(0, 3).map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => onProductClick(item)}
                                    className="flex-shrink-0 w-64 p-5 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-[2rem] relative group cursor-pointer hover:scale-[1.02] transition-transform"
                                >
                                    <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-indigo-500/60 bg-white/50 dark:bg-black/20 px-2 py-1 rounded-full border border-indigo-500/10">Bestseller</div>
                                    <h4 className="text-lg font-black text-app-text uppercase tracking-tight mb-1 truncate pr-10 italic">{item.itemname}</h4>
                                    <p className="text-[10px] text-app-muted font-bold uppercase tracking-widest mb-4">₹{item.price} • {item.catg}</p>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
                                        className="w-full py-2.5 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
                                    >
                                        Quick Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
