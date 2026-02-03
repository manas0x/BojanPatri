import React from 'react'

const OrderHistoryView = ({ orders, onBack }) => {
    return (
        <div className="animate-fade-in p-6 max-w-2xl mx-auto">
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-app-muted hover:text-app-text transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-widest">Back to Menu</span>
            </button>

            <h2 className="text-4xl font-black text-app-text uppercase tracking-tighter mb-8 leading-none">
                My <br /> Orders
            </h2>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-app-surface/30 rounded-[3rem] border border-app-border border-dashed">
                    <p className="text-app-muted font-bold uppercase tracking-widest text-xs">No orders found yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((order) => (
                        <div key={order.id} className="bg-app-surface/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-app-border/40 shadow-xl overflow-hidden relative">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter mb-1 inline-block ${order.status === 'ready' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                        {order.status === 'ready' ? 'Ready to Serve' : 'Preparing...'}
                                    </span>
                                    <p className="text-[10px] font-bold text-app-muted uppercase tracking-widest">
                                        {new Date(order.timestamp).toLocaleDateString()} &bull; {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <span className="text-xl font-black text-app-text">₹{order.total}</span>
                            </div>

                            <div className="space-y-2 mb-4 bg-app-bg/30 p-4 rounded-2xl border border-app-border/20">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-[11px] font-bold">
                                        <span className="text-app-text uppercase">{item.itemname}</span>
                                        <span className="text-app-muted">x{item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href={`/invoice/${order.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-indigo-500/10 text-indigo-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center block border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
                            >
                                View Digital Invoice
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrderHistoryView
