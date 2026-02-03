import React from 'react'

const PublicInvoiceView = ({ order, config }) => {
    if (!order) return <div className="p-10 text-center text-slate-500">Invoice not found</div>

    return (
        <div className="min-h-screen bg-white text-slate-900 p-6 font-sans">
            <div className="max-w-xl mx-auto border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-slate-950 p-8 text-white">
                    <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">{config.shopname}</h1>
                    <div className="flex justify-between items-center">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Digital Invoice</p>
                        {order.displayId && <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">#{order.displayId}</p>}
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer</h3>
                            <p className="font-bold text-lg">{order.customer.name}</p>
                            <p className="text-slate-500 text-sm">{order.customer.phone}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</h3>
                            <p className="font-bold">{new Date(order.timestamp).toLocaleDateString()}</p>
                            <p className="text-slate-500 text-sm">{new Date(order.timestamp).toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Order Items</h3>
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="font-black text-slate-300">{item.quantity}x</span>
                                    <span className="font-bold">{item.itemname}</span>
                                </div>
                                <span className="font-bold">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center">
                        <span className="font-black uppercase tracking-widest text-xs text-slate-500">Total Amount</span>
                        <span className="text-3xl font-black text-slate-950">₹{order.total}</span>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-slate-400 text-xs italic mb-4">Thank you for shopping with us!</p>
                        <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full mb-8"></div>

                        <div className="pt-8 border-t border-slate-100">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Developed By</p>
                            <a
                                href="https://manas0x.site"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-500 font-black text-sm hover:text-indigo-600 transition-colors uppercase tracking-widest"
                            >
                                Manas Arora
                            </a>
                            <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">manas0x.site</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12 pb-20 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center gap-3 mx-auto"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Invoice
                </button>
            </div>
        </div>
    )
}

export default PublicInvoiceView
