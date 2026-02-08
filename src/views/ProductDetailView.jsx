import React from 'react'

const ProductDetailView = ({ item, onAddToCart, onBack }) => {
    if (!item) return null

    return (
        <div className="animate-slide-left min-h-[80vh] bg-app-bg px-4 pt-6 pb-20">
            <div className="relative aspect-square w-full bg-app-surface rounded-[3rem] overflow-hidden border border-app-border mb-8 flex items-center justify-center">
                <div className="text-app-muted/10 font-black text-6xl uppercase transform -rotate-12 select-none">
                    {item.itemname}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-transparent to-transparent"></div>
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 p-3 bg-app-surface/80 backdrop-blur-md rounded-2xl text-app-text border border-app-border shadow-xl"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <div className="px-2">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                            {item.catg}
                        </span>
                        <h2 className="text-4xl font-black text-app-text uppercase tracking-tighter leading-none">
                            {item.itemname}
                        </h2>
                    </div>
                    <div className="text-3xl font-black text-indigo-400">
                        ₹{item.price}
                    </div>
                </div>

                <p className="text-app-muted text-lg leading-relaxed mb-10">
                    Indulge in our signature {item.itemname}. Crafted with premium {item.catg.toLowerCase()} ingredients and served fresh from our kitchen to your heart. A taste experience that defines luxury in every bite.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-app-surface/50 rounded-2xl border border-app-border">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-app-text font-bold text-sm uppercase">Quick Delivery</h4>
                            <p className="text-app-muted text-xs"> Arrives in 15-20 mins</p>
                        </div>
                    </div>

                    <button
                        onClick={() => onAddToCart(item)}
                        className="w-full bg-indigo-600 py-6 rounded-[2rem] text-white font-black uppercase tracking-widest text-lg hover:bg-indigo-500 transition-all shadow-[0_20px_40px_-15px_rgba(79,70,229,0.5)] active:scale-[0.95]"
                    >
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailView
