import React from 'react'

const MenuItem = ({ item, onAddToCart, onClick }) => {
    const isUnavailable = item.isUnavailable

    return (
        <div
            onClick={isUnavailable ? null : onClick}
            className={`group relative bg-app-surface/40 backdrop-blur-sm rounded-[2rem] p-6 border transition-all duration-500 overflow-hidden shadow-2xl shadow-black/5 ${isUnavailable
                ? 'grayscale cursor-not-allowed border-app-border opacity-60'
                : 'hover:border-indigo-500/30 border-app-border/40 hover:bg-app-surface active:scale-[0.98] cursor-pointer'
                }`}
        >
            {isUnavailable && (
                <div className="absolute top-5 right-5 z-10 bg-red-500 text-white text-[8px] font-black px-2.5 py-1.5 rounded-xl shadow-lg rotate-12 uppercase tracking-tighter">
                    Sold Out
                </div>
            )}
            <div className="flex justify-between items-start mb-5">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                            {item.catg}
                        </span>
                        {item.price > 200 && (
                            <span className="inline-block px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                Signature
                            </span>
                        )}
                    </div>
                    <h3 className="text-2xl font-black text-app-text group-hover:text-indigo-500 transition-colors tracking-tight italic">
                        {item.itemname}
                    </h3>
                </div>
                <div className="text-3xl font-black text-indigo-500 bg-indigo-500/5 px-4 py-2 rounded-[1.5rem] border border-indigo-500/10 lowercase tabular-nums">
                    ₹{item.price}
                </div>
            </div>

            <p className="text-app-muted text-sm leading-relaxed pr-10 line-clamp-2">
                Crafted with premium {item.itemname} and our signature blend of hand-picked seasonal spices.
            </p>

            <div className="mt-10 flex items-center justify-between">
                <button
                    disabled={isUnavailable}
                    onClick={(e) => {
                        e.stopPropagation()
                        onAddToCart(item)
                    }}
                    className={`flex items-center gap-3 text-indigo-500 group-hover:gap-4 transition-all duration-300 ${isUnavailable ? 'opacity-20 grayscale pointer-events-none' : ''}`}
                >
                    <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 active:scale-90 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Add to Bag</span>
                </button>


                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                    <svg className="w-6 h-6 text-indigo-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
        </div>
    )
}

export default MenuItem
