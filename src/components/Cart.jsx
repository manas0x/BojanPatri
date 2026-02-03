import React, { useState } from 'react'
import CheckoutForm from './CheckoutForm'

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onCheckout, customers, isSelfOrder }) => {
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (!isOpen) return null

    const handleCheckoutSubmit = (customer, paymentMethod) => {
        onCheckout(customer, total, paymentMethod)
        setIsCheckingOut(false)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md flex flex-col bg-app-bg shadow-2xl border-l border-app-border animate-slide-left transition-colors duration-300">
                    {isCheckingOut ? (
                        <CheckoutForm
                            onSubmit={handleCheckoutSubmit}
                            onBack={() => setIsCheckingOut(false)}
                            customers={customers}
                            isSelfOrder={isSelfOrder}
                        />
                    ) : (
                        <>
                            <div className="flex-1 h-0 overflow-y-auto py-6 px-4 sm:px-6">
                                <div className="flex items-start justify-between mb-8">
                                    <h2 className="text-2xl font-black text-app-text uppercase tracking-tighter">Your Order</h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 -mr-2 text-app-muted hover:text-app-text transition-colors bg-app-surface rounded-xl border border-app-border"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                                        <div className="w-24 h-24 bg-app-surface rounded-full flex items-center justify-center mb-6 border border-app-border">
                                            <svg className="w-10 h-10 text-app-muted/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                        <p className="text-app-muted font-medium">Your cart is feeling light...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {cartItems.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 bg-app-surface/40 p-4 rounded-2xl border border-app-border/50">
                                                <div className="flex-1">
                                                    <h3 className="text-app-text font-bold leading-tight uppercase tracking-tight text-sm">{item.itemname}</h3>
                                                    <p className="text-indigo-500 font-black mt-1">₹{item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-3 bg-app-bg/50 p-1.5 rounded-xl border border-app-border/50">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.itemname, -1)}
                                                        className="w-7 h-7 flex items-center justify-center text-app-muted"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                    <span className="text-app-text font-black w-4 text-center text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.itemname, 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-app-muted"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-app-border p-6 bg-app-surface/40 backdrop-blur-md">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-app-muted font-black uppercase tracking-widest text-[10px]">Grand Total</span>
                                    <span className="text-4xl font-black text-app-text leading-none tracking-tighter lowercase">₹{total}</span>
                                </div>
                                <button
                                    onClick={() => setIsCheckingOut(true)}
                                    disabled={cartItems.length === 0}
                                    className="w-full bg-indigo-600 py-5 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-[0_20px_40px_-15px_rgba(79,70,229,0.5)] active:scale-[0.98] disabled:opacity-50"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
