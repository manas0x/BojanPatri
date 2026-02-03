import React, { useState } from 'react'

const CheckoutForm = ({ onSubmit, onBack, customers = [], isSelfOrder }) => {
    const [customer, setCustomer] = useState({ name: '', phone: '' })
    const [paymentMethod, setPaymentMethod] = useState('UPI')
    const [tableNumber, setTableNumber] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (customer.name && customer.phone) {
            onSubmit(customer, paymentMethod, tableNumber)
        }
    }

    const handlePhoneChange = (val) => {
        setCustomer({ ...customer, phone: val })
        // For privacy, never show suggestions in self-order mode (/self)
        if (!isSelfOrder) {
            setShowSuggestions(val.length > 2)
        }
    }

    const selectCustomer = (c) => {
        setCustomer({ name: c.name, phone: c.phone })
        setShowSuggestions(false)
    }

    const suggestions = customers.filter(c =>
        c.phone.replace(/\D/g, '').includes(customer.phone.replace(/\D/g, '')) ||
        c.name.toLowerCase().includes(customer.phone.toLowerCase())
    ).slice(0, 3)

    return (
        <div className="animate-slide-left p-6 flex flex-col h-full bg-app-bg transition-colors duration-300">
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-app-muted hover:text-app-text transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-widest">Back to Review</span>
            </button>

            <h2 className="text-3xl font-black text-app-text uppercase tracking-tighter mb-8 leading-none">
                Customer <br /> Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                {isSelfOrder && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <label className="block text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-2 px-1">Table Number</label>
                        <input
                            required
                            type="number"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full bg-app-surface border-2 border-indigo-500/30 rounded-3xl py-5 px-6 text-app-text placeholder-app-muted/30 focus:border-indigo-500 outline-none transition-all shadow-xl text-2xl font-black"
                            placeholder="e.g. 05"
                        />
                    </div>
                )}

                <div className="relative">
                    <label className="block text-[10px] font-black text-app-muted uppercase tracking-[0.2em] mb-2 px-1">Phone Number</label>
                    <input
                        required
                        type="tel"
                        autoFocus
                        value={customer.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onFocus={() => customer.phone.length > 2 && setShowSuggestions(true)}
                        className="w-full bg-app-surface border border-app-border rounded-3xl py-5 px-6 text-app-text placeholder-app-muted/30 focus:border-indigo-500 outline-none transition-all shadow-xl"
                        placeholder="Type phone or name..."
                    />

                    {showSuggestions && suggestions.length > 0 && !isSelfOrder && (
                        <div className="absolute z-50 w-full mt-2 bg-app-surface border border-app-border rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                            {suggestions.map((c, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => selectCustomer(c)}
                                    className="w-full px-6 py-4 text-left hover:bg-app-bg transition-colors border-b border-app-border last:border-0 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="text-app-text font-bold text-sm tracking-tight">{c.name}</p>
                                        <p className="text-app-muted text-[10px] font-black uppercase tracking-widest">{c.phone}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-[10px] font-black text-app-muted uppercase tracking-[0.2em] mb-2 px-1">Customer Name</label>
                    <input
                        required
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        className="w-full bg-app-surface border border-app-border rounded-3xl py-5 px-6 text-app-text placeholder-app-muted/30 focus:border-indigo-500 outline-none transition-all shadow-xl"
                        placeholder="Enter full name"
                    />
                </div>

                <div className="py-2">
                    <label className="block text-[10px] font-black text-app-muted uppercase tracking-[0.2em] mb-3 px-1">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('UPI')}
                            className={`py-4 rounded-2xl flex flex-col items-center gap-1 border transition-all ${paymentMethod === 'UPI' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-app-surface border-app-border text-app-muted hover:border-indigo-500/30'}`}
                        >
                            <span className="text-xs font-black uppercase tracking-wider">UPI</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaymentMethod('Cash')}
                            className={`py-4 rounded-2xl flex flex-col items-center gap-1 border transition-all ${paymentMethod === 'Cash' ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-app-surface border-app-border text-app-muted hover:border-indigo-500/30'}`}
                        >
                            <span className="text-xs font-black uppercase tracking-wider">Cash</span>
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 py-6 rounded-[2rem] text-white font-black uppercase tracking-widest text-lg hover:bg-indigo-500 transition-all shadow-[0_20px_40px_-15px_rgba(79,70,229,0.5)] active:scale-[0.95] mt-6"
                >
                    Confirm Order
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm
