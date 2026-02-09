import React, { useState } from 'react'
import AdminQRView from './AdminQRView'

const DashboardView = ({ orders, onRemoveOrder, onToggleStatus, shopname, menu, unavailableItems, onToggleAvailability, onLogout, user, customers = [], onProductAdd, onProductDelete, onSettingsClick }) => {
    const [activeTab, setActiveTab] = useState('overview')

    const totalRev = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRev / totalOrders) : 0

    const itemStats = orders.flatMap(o => o.items).reduce((acc, item) => {
        acc[item.itemname] = (acc[item.itemname] || 0) + item.quantity
        return acc
    }, {})
    const popularItem = Object.entries(itemStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

    const sendWhatsApp = (order) => {
        const date = new Date(order.timestamp).toLocaleString()
        const origin = window.location.origin
        const orderId = order.displayId ? `#${order.displayId}` : (order.id || 'N/A')
        const invoiceUrl = `${origin}/invoice/${order.id}`
        const nameOfShop = shopname || 'Our Shop'
        const message = `Dear ${order.customer.name},\n\nThank you for your recent order at ${nameOfShop}! Your invoice is now available. 🪄\n\n💰 Amount : Rs.${order.total}\n📅 Date : ${date}\n🔗 View Invoice : ${invoiceUrl}\n\nLoved your experience? Or something to improve? Tap to tell us! 💬✨`
        const encoded = encodeURIComponent(message)
        const rawPhone = order.customer.phone.replace(/\D/g, '')
        const formattedPhone = rawPhone.startsWith('91') && rawPhone.length > 10 ? rawPhone : `91${rawPhone}`
        window.open(`https://wa.me/${formattedPhone}?text=${encoded}`, '_blank')
    }

    // Calculate Top Selling Items
    const itemCounts = orders.reduce((acc, order) => {
        order.items.forEach(item => {
            acc[item.itemname] = (acc[item.itemname] || 0) + item.quantity
        })
        return acc
    }, {})

    const topSelling = Object.entries(itemCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)

    // Sound Notification for New Orders
    React.useEffect(() => {
        if (orders.length > 0 && user && !user.isAnonymous) {
            const lastOrder = orders[orders.length - 1]
            const now = new Date().getTime()
            const orderTime = new Date(lastOrder.timestamp).getTime()

            // Only play for very recent orders (last 10 seconds)
            if (now - orderTime < 10000) {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
                audio.play().catch(e => console.log('Audio play blocked or failed'))
            }
        }
    }, [orders.length, user])

    return (
        <div className="animate-fade-in p-6 pb-32 max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-start print:hidden">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-4xl font-black text-app-text uppercase tracking-tighter leading-none">Admin</h2>
                        <button
                            onClick={onLogout}
                            className="px-3 py-1 bg-app-surface border border-app-border rounded-lg text-[8px] font-black text-red-500 uppercase tracking-widest hover:bg-red-500/10 transition-colors mt-1"
                        >
                            Sign Out
                        </button>
                    </div>
                    <p className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mt-1">Command Center</p>
                </div>
                <div className="bg-app-surface border border-app-border p-1 rounded-2xl flex gap-1 shadow-2xl overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex-shrink-0 ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-app-muted hover:text-app-text'}`}
                    >
                        Insights
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex-shrink-0 ${activeTab === 'inventory' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-app-muted hover:text-app-text'}`}
                    >
                        Stock
                    </button>
                    <button
                        onClick={() => setActiveTab('qr')}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex-shrink-0 ${activeTab === 'qr' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-app-muted hover:text-app-text'}`}
                    >
                        QR Code
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex-shrink-0 ${activeTab === 'products' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-app-muted hover:text-app-text'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('customers')}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex-shrink-0 ${activeTab === 'customers' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-app-muted hover:text-app-text'}`}
                    >
                        Customers
                    </button>
                    <button
                        onClick={onSettingsClick}
                        className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex-shrink-0 text-amber-500 hover:bg-amber-500/10 flex items-center gap-2"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Platform
                    </button>
                </div>
            </div>

            {activeTab === 'overview' ? (
                <div className="animate-fade-in space-y-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 tracking-tighter">
                        <div className="bg-app-surface/40 backdrop-blur-xl p-6 rounded-[2rem] border border-glass-border shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                            <span className="text-[10px] font-black text-indigo-500/60 uppercase tracking-[0.2em] block mb-2">Revenue</span>
                            <span className="text-3xl font-black text-app-text leading-none tabular-nums">₹{totalRev}</span>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
                        </div>
                        <div className="bg-app-surface/40 backdrop-blur-xl p-6 rounded-[2rem] border border-glass-border shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                            <span className="text-[10px] font-black text-purple-500/60 uppercase tracking-[0.2em] block mb-2">Volume</span>
                            <span className="text-3xl font-black text-app-text leading-none tabular-nums">{totalOrders}</span>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
                        </div>
                        <div className="bg-app-surface/40 backdrop-blur-xl p-6 rounded-[2rem] border border-glass-border shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                            <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em] block mb-2">Ticket</span>
                            <span className="text-3xl font-black text-app-text leading-none tabular-nums">₹{avgOrderValue}</span>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
                        </div>
                        <div className="bg-app-surface/40 backdrop-blur-xl p-6 rounded-[2rem] border border-glass-border shadow-2xl transition-all hover:scale-105 active:scale-95 group overflow-hidden">
                            <span className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] block mb-2">Fan-Fav</span>
                            <span className="text-xl font-black text-app-text uppercase truncate block italic leading-none">{popularItem}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-app-text uppercase tracking-[0.2em] px-2 leading-none">Top Selling</h3>
                        <div className="bg-app-surface/50 p-6 rounded-[2.5rem] border border-app-border/40">
                            <div className="space-y-4">
                                {topSelling.map(([name, count], i) => (
                                    <div key={name} className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-app-muted w-4">0{i + 1}</span>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-bold text-app-text uppercase">{name}</span>
                                                <span className="text-[10px] font-black text-indigo-500 uppercase">{count} Sold</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-app-bg rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500 rounded-full"
                                                    style={{ width: `${(count / topSelling[0][1]) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-app-surface/30 p-6 rounded-[2.5rem] border border-app-border/50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black text-app-text uppercase tracking-[0.2em]">Daily Target</h3>
                            <span className="text-[10px] font-bold text-app-muted">Progress</span>
                        </div>
                        <div className="w-full h-8 bg-app-bg rounded-2xl p-1 border border-app-border/50">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] animate-pulse" style={{ width: '50%' }}></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xs font-black text-app-text uppercase tracking-[0.2em] leading-none">Live Orders</h3>
                            <span className="text-[10px] font-bold text-emerald-500 animate-pulse uppercase tracking-widest">Real-time</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orders.slice().reverse().map((order) => (
                                <div key={order.id} className="bg-app-surface/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-app-border/40 shadow-xl relative group overflow-hidden transition-all hover:scale-[1.02]">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${order.status === 'ready' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'}`}></span>
                                                <h4 className="text-app-text font-black uppercase text-sm">{order.customer.name}</h4>
                                                <span className="text-[10px] font-black text-indigo-500/60 ml-1">#{order.displayId || '...'}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${order.paymentMethod === 'UPI' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                    {order.paymentMethod || 'CASH'}
                                                </span>
                                                {order.tableNumber && (
                                                    <span className="text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter bg-emerald-500/20 text-emerald-400">
                                                        Table {order.tableNumber}
                                                    </span>
                                                )}
                                                <span className="text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter bg-app-bg text-app-muted">
                                                    {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-lg font-black text-app-text">₹{order.total}</span>
                                    </div>

                                    <div className="space-y-2 mb-6 bg-app-bg/30 p-4 rounded-2xl border border-app-border/20">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-[11px] font-bold">
                                                <span className="text-app-text uppercase truncate max-w-[150px]">{item.itemname}</span>
                                                <span className="text-app-muted shrink-0">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => onToggleStatus(order.id)}
                                            className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${order.status === 'ready' ? 'bg-app-bg text-app-muted border border-app-border' : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30'}`}
                                        >
                                            {order.status === 'ready' ? 'Completed' : 'Mark Ready'}
                                        </button>
                                        <button onClick={() => sendWhatsApp(order)} className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600/30 transition-all">WhatsApp</button>
                                    </div>

                                    <button onClick={() => onRemoveOrder(order.id)} className="absolute top-6 right-6 text-app-muted group-hover:text-red-500/50 hover:!text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : activeTab === 'products' ? (
                <div className="animate-fade-in space-y-8">
                    <div className="bg-app-surface/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-app-border/40 shadow-xl">
                        <h3 className="text-sm font-black text-app-text uppercase tracking-[0.2em] mb-6">Add New Item</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.target)
                            onProductAdd({
                                itemname: formData.get('name'),
                                catg: formData.get('category'),
                                price: parseInt(formData.get('price'))
                            })
                            e.target.reset()
                        }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <input name="name" type="text" placeholder="Item Name" required className="bg-app-bg border border-app-border rounded-xl px-4 py-3 text-xs font-bold text-app-text uppercase placeholder:text-app-muted focus:border-indigo-500 outline-none transition-colors" />
                            <input name="category" type="text" placeholder="Category" required className="bg-app-bg border border-app-border rounded-xl px-4 py-3 text-xs font-bold text-app-text uppercase placeholder:text-app-muted focus:border-indigo-500 outline-none transition-colors" />
                            <div className="flex gap-2">
                                <input name="price" type="number" placeholder="Price" required className="flex-1 bg-app-bg border border-app-border rounded-xl px-4 py-3 text-xs font-bold text-app-text uppercase placeholder:text-app-muted focus:border-indigo-500 outline-none transition-colors" />
                                <button type="submit" className="bg-indigo-600 text-white px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-600/20">Add</button>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-app-text uppercase tracking-[0.2em] px-2 leading-none">Current Menu</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {menu.map((item) => (
                                <div key={item.id} className="bg-app-surface/40 p-5 rounded-3xl border border-app-border/30 flex justify-between items-center group">
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="font-black uppercase text-sm text-app-text truncate">{item.itemname}</h4>
                                        <span className="text-[9px] font-bold text-app-muted uppercase tracking-widest">{item.catg} &bull; ₹{item.price}</span>
                                    </div>
                                    <button onClick={() => onProductDelete(item.id)} className="p-2 text-app-muted hover:text-red-500 transition-colors bg-app-bg/50 rounded-xl border border-app-border/50">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : activeTab === 'inventory' ? (
                <div className="animate-fade-in space-y-6">
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-3xl flex gap-3 mb-8">
                        <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-wide leading-tight">
                            Toggling stock will instantly hide or show items from your customer's digital menu.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {menu.map((item, idx) => {
                            const isOut = unavailableItems.includes(item.itemname)
                            return (
                                <div key={idx} className="bg-app-surface/40 p-5 rounded-[2rem] border border-app-border/30 flex justify-between items-center group shadow-sm">
                                    <div>
                                        <h4 className={`font-black uppercase text-sm transition-colors ${isOut ? 'text-app-muted' : 'text-app-text'}`}>{item.itemname}</h4>
                                        <span className="text-[8px] font-bold text-app-muted uppercase tracking-widest">{item.catg} &bull; ₹{item.price}</span>
                                    </div>
                                    <button
                                        onClick={() => onToggleAvailability(item.itemname)}
                                        className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isOut ? 'bg-red-600/10 text-red-500 border border-red-500/20' : 'bg-emerald-600/10 text-emerald-500 border border-emerald-500/20'}`}
                                    >
                                        {isOut ? 'Out of Stock' : 'In Stock'}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : activeTab === 'customers' ? (
                <div className="animate-fade-in space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-black text-app-text uppercase tracking-[0.2em] leading-none">Registered Customers</h3>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{customers.length} People</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {customers.sort((a, b) => new Date(b.lastOrder) - new Date(a.lastOrder)).map((customer, idx) => (
                            <div key={idx} className="bg-app-surface/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-app-border/40 shadow-xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 font-black text-xl">
                                    {customer.name?.charAt(0) || 'C'}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="text-app-text font-black uppercase text-sm truncate">{customer.name}</h4>
                                    <p className="text-app-muted text-[10px] font-bold uppercase tracking-widest">{customer.phone}</p>
                                    <p className="text-indigo-500/60 text-[8px] font-black uppercase tracking-tighter mt-1">
                                        Last Order: {new Date(customer.lastOrder).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <AdminQRView shopname={shopname} />
            )}
        </div>
    )
}

export default DashboardView
