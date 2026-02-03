import { useState } from 'react'
import config from '../config.json'

function App() {
    const [activeCategory, setActiveCategory] = useState('All')

    const categories = ['All', ...new Set(config.menu.map(item => item.catg))]

    const filteredMenu = activeCategory === 'All'
        ? config.menu
        : config.menu.filter(item => item.catg === activeCategory)

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
            <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                            {config.shopname}
                        </h1>
                        <div className="flex space-x-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold sm:text-5xl tracking-tight text-white mb-4">
                        Our Menu
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Discover our curated selection of flavors, crafted with passion and served with a smile.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMenu.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-indigo-400 mb-2 border border-slate-700">
                                        {item.catg}
                                    </span>
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                        {item.itemname}
                                    </h3>
                                </div>
                                <div className="text-2xl font-bold text-indigo-400">
                                    ₹{item.price}
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Freshly prepared with premium ingredients for the perfect {item.catg.toLowerCase()} experience.
                            </p>
                            <div className="mt-6 flex items-center justify-between">
                                <button className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                                    VIEW DETAILS
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 absolute bottom-0 left-0 rounded-b-2xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="border-t border-slate-900 bg-slate-950/50 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} {config.shopname}. All rights reserved in Rupees (₹).
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
