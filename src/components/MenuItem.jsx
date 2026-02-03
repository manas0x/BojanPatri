import React from 'react'

const MenuItem = ({ item, onAddToCart, onClick }) => {
    const isUnavailable = item.isUnavailable

    return (
        <div
            onClick={isUnavailable ? null : onClick}
            className={`group relative bg-app-surface rounded-3xl p-5 border transition-all duration-500 overflow-hidden shadow-xl ${isUnavailable
                ? 'grayscale cursor-not-allowed border-app-border opacity-60'
                : 'hover:border-indigo-500/40 border-app-border/50 hover:bg-app-surface active:scale-[0.98] cursor-pointer'
                }`}
        >
            {isUnavailable && (
                <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg rotate-12">
                    SOLD OUT
                </div>
            )}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {item.catg}
                        </span>
                        {item.price > 200 && (
                            <span className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                Premium
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-app-text group-hover:text-indigo-400 transition-colors tracking-tight">
                        {item.itemname}
                    </h3>
                </div>
                <div className="text-2xl font-black text-indigo-400 bg-indigo-500/5 px-3 py-1 rounded-2xl border border-indigo-500/10 lowercase">
                    ₹{item.price}
                </div>
            </div>

            <p className="text-app-muted text-sm leading-relaxed line-clamp-2 pr-8">
                Authentic flavors of {item.itemname} prepared with secret spices and fresh ingredients.
            </p>

            <div className="mt-8 flex items-center justify-between">
                <button
                    disabled={isUnavailable}
                    onClick={(e) => {
                        e.stopPropagation()
                        onAddToCart(item)
                    }}
                    className={`flex items-center gap-2 text-indigo-400 group-hover:gap-3 transition-all duration-300 ${isUnavailable ? 'opacity-20 grayscale pointer-events-none' : 'hover:text-white'}`}
                >
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Add to Order</span>
                </button>


                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0">
                    <svg className="w-5 h-5 text-indigo-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            <div className="absolute -bottom-1 -left-1 -right-1 h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
        </div>
    )
}

export default MenuItem
