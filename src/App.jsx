import { useState, useEffect } from 'react'
import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
    query,
    orderBy,
    runTransaction
} from 'firebase/firestore'
import { db, auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import config from '../config.json'
import Header from './components/Header'
import Cart from './components/Cart'
import BottomNav from './components/BottomNav'
import MenuView from './views/MenuView'
import ProductDetailView from './views/ProductDetailView'
import DashboardView from './views/DashboardView'
import PublicInvoiceView from './views/PublicInvoiceView'
import LoginView from './views/LoginView'
import OrderHistoryView from './views/OrderHistoryView'

function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
    const [user, setUser] = useState(null)
    const [activeCategory, setActiveCategory] = useState('All')
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [currentView, setCurrentView] = useState(() => {
        const path = window.location.pathname
        if (path.startsWith('/invoice/')) return 'invoice'
        if (path === '/self') return 'menu'
        // Root (/) and /admin both go to dashboard
        return 'dashboard'
    })
    const [isSelfOrder, setIsSelfOrder] = useState(() => window.location.pathname === '/self')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [orders, setOrders] = useState([])
    const [localOrderIds, setLocalOrderIds] = useState(() => {
        const saved = localStorage.getItem('orderHistory')
        return saved ? JSON.parse(saved) : []
    })
    const [localCustomer, setLocalCustomer] = useState(() => {
        const saved = localStorage.getItem('customerProfile')
        return saved ? JSON.parse(saved) : { name: '', phone: '' }
    })
    const [customers, setCustomers] = useState([])
    const [unavailableItems, setUnavailableItems] = useState([])
    const [menu, setMenu] = useState([])

    // Watch URL changes (popstate)
    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname
            if (path.startsWith('/invoice/')) {
                setCurrentView('invoice')
                setIsSelfOrder(false)
            } else if (path === '/self') {
                setCurrentView('menu')
                setIsSelfOrder(true)
            } else { // Handles '/' and '/admin'
                setCurrentView('dashboard')
                setIsSelfOrder(false)
            }
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    const handleViewChange = (view) => {
        setCurrentView(view)
        if (view === 'dashboard') {
            window.history.pushState({}, '', '/') // Changed to root for dashboard
            setIsSelfOrder(false)
        } else if (view === 'menu') {
            // Only push /self if we are already in self-order mode or explicitly starting it
            if (isSelfOrder) {
                window.history.pushState({}, '', '/self')
            } else {
                window.history.pushState({}, '', '/')
            }
        }
    }

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u)
            } else {
                setUser(null)
            }
        })
        return () => unsubscribe()
    }, [])

    const handleLogout = async () => {
        try {
            await signOut(auth)
            handleViewChange('menu')
        } catch (err) {
            alert('Sign out failed.')
        }
    }

    // Theme Sync
    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const handleToggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    // Listen for Orders
    useEffect(() => {
        const q = query(collection(db, 'orders'), orderBy('timestamp', 'asc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setOrders(ordersData)
        })
        return () => unsubscribe()
    }, [])

    // Listen for Customers
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'customers'), (snapshot) => {
            const customersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setCustomers(customersData)
        })
        return () => unsubscribe()
    }, [])

    // Listen for Inventory Settings
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'inventory'), (doc) => {
            if (doc.exists()) {
                setUnavailableItems(doc.data().unavailable || [])
            }
        })
        return () => unsubscribe()
    }, [])

    // Listen for Menu Products
    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('catg', 'asc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const menuData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setMenu(menuData.length > 0 ? menuData : config.menu) // Fallback to config if DB empty
        })
        return () => unsubscribe()
    }, [])

    const categories = ['All', ...new Set(menu.map(item => item.catg))]
    const filteredMenu = activeCategory === 'All'
        ? menu
        : menu.filter(item => item.catg === activeCategory)

    const handleAddToCart = (item) => {
        if (unavailableItems.includes(item.itemname)) return
        setCartItems(prev => {
            const existing = prev.find(i => i.itemname === item.itemname)
            if (existing) {
                return prev.map(i => i.itemname === item.itemname
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const handleUpdateQuantity = (itemname, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.itemname === itemname) {
                const newQty = Math.max(0, item.quantity + delta)
                return { ...item, quantity: newQty }
            }
            return item
        }).filter(item => item.quantity > 0))
    }

    const handleCheckout = async (customer, total, paymentMethod, tableNumber = '') => {
        try {
            // Sequential Order ID Logic
            let displayId = ''
            await runTransaction(db, async (transaction) => {
                const counterRef = doc(db, 'settings', 'orderCounter')
                const counterSnap = await transaction.get(counterRef)

                let nextId = 1001
                if (counterSnap.exists()) {
                    nextId = counterSnap.data().index + 1
                }

                transaction.set(counterRef, { index: nextId }, { merge: true })
                displayId = nextId.toString()
            })

            const orderData = {
                uid: !isSelfOrder ? user?.uid : null,
                displayId: displayId, // Sequential ID like 1002
                customer,
                items: cartItems,
                total,
                paymentMethod,
                tableNumber: tableNumber,
                type: isSelfOrder ? 'dine-in' : 'takeaway',
                timestamp: new Date().toISOString(),
                status: 'pending'
            }
            // Save Order
            const docRef = await addDoc(collection(db, 'orders'), orderData)

            // Save for local history if self-order
            if (isSelfOrder) {
                const newIds = [...localOrderIds, docRef.id]
                setLocalOrderIds(newIds)
                localStorage.setItem('orderHistory', JSON.stringify(newIds))

                // Save customer profile locally for autofill
                const profile = { name: customer.name, phone: customer.phone }
                setLocalCustomer(profile)
                localStorage.setItem('customerProfile', JSON.stringify(profile))
            }

            // Save/Update Customer Profile
            const phoneKey = customer.phone.replace(/\D/g, '')
            if (phoneKey) {
                await setDoc(doc(db, 'customers', phoneKey), {
                    name: customer.name,
                    phone: customer.phone,
                    lastOrder: new Date().toISOString()
                }, { merge: true })
            }

            setCartItems([])
            setCurrentView('menu')
            alert(`Order confirmed via ${paymentMethod}! ID: #${displayId}`)
        } catch (err) {
            console.error("Error adding order: ", err)
            alert("Checkout failed. Please check your connection.")
        }
    }

    const handleRemoveOrder = async (id) => {
        if (confirm('Are you sure you want to void this order?')) {
            try {
                await deleteDoc(doc(db, 'orders', id))
            } catch (err) {
                alert("Action failed: Permission denied or network issue.")
            }
        }
    }

    const handleToggleStatus = async (id) => {
        const order = orders.find(o => o.id === id)
        if (!order) return
        try {
            await updateDoc(doc(db, 'orders', id), {
                status: order.status === 'ready' ? 'pending' : 'ready'
            })
        } catch (err) {
            alert("Update failed.")
        }
    }

    const handleToggleAvailability = async (itemname) => {
        const newUnavailable = unavailableItems.includes(itemname)
            ? unavailableItems.filter(i => i !== itemname)
            : [...unavailableItems, itemname]

        try {
            await setDoc(doc(db, 'settings', 'inventory'), {
                unavailable: newUnavailable
            }, { merge: true })
        } catch (err) {
            alert("Inventory update failed.")
        }
    }

    const handleProductAdd = async (product) => {
        try {
            await addDoc(collection(db, 'products'), {
                ...product,
                timestamp: new Date().toISOString()
            })
            alert("Product added successfully!")
        } catch (err) {
            console.error("Error adding product:", err)
            alert("Failed to add product.")
        }
    }

    const handleProductDelete = async (productId) => {
        if (!confirm("Are you sure you want to delete this product?")) return
        try {
            await deleteDoc(doc(db, 'products', productId))
        } catch (err) {
            alert("Delete failed.")
        }
    }

    const handleProductClick = (product) => {
        setSelectedProduct(product)
        setCurrentView('detail')
        window.scrollTo(0, 0)
    }

    const handleBackToMenu = () => {
        setCurrentView('menu')
        setSelectedProduct(null)
        if (isSelfOrder) window.history.pushState({}, '', '/self')
        else window.history.pushState({}, '', '/')
    }

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    // Simple Invoice Routing
    if (currentView === 'invoice') {
        const invId = window.location.pathname.split('/').pop()
        const invOrder = orders.find(o => o.id === invId)
        return <PublicInvoiceView order={invOrder} config={config} theme={theme} />
    }

    if (!isSelfOrder && !user) {
        return (
            <div className="min-h-screen bg-app-bg text-app-text transition-colors duration-300 flex flex-col justify-center">
                <LoginView onLoginSuccess={() => handleViewChange('dashboard')} />
            </div>
        )
    }

    const myOrders = isSelfOrder
        ? orders.filter(o => localOrderIds.includes(o.id))
        : orders.filter(o => o.uid === user?.uid)

    return (
        <div className="min-h-screen bg-app-bg text-app-text selection:bg-indigo-500/30 font-sans pb-24 transition-colors duration-300">
            <Header
                shopname={config.shopname}
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
                isRoot={currentView === 'menu'}
                onBack={handleBackToMenu}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                isSelfOrder={isSelfOrder}
                hasOrders={myOrders.length > 0}
                onMyOrdersClick={() => setCurrentView('myOrders')}
            />

            <main className="max-w-7xl mx-auto py-8">
                {currentView === 'menu' && (
                    <MenuView
                        config={config}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        categories={categories}
                        filteredMenu={filteredMenu}
                        onAddToCart={handleAddToCart}
                        onProductClick={handleProductClick}
                        unavailableItems={unavailableItems}
                    />
                )}

                {currentView === 'myOrders' && (
                    <OrderHistoryView
                        orders={myOrders}
                        onBack={handleBackToMenu}
                    />
                )}

                {currentView === 'detail' && (
                    <ProductDetailView
                        item={selectedProduct}
                        onAddToCart={handleAddToCart}
                        onBack={handleBackToMenu}
                    />
                )}

                {currentView === 'dashboard' && (
                    <DashboardView
                        orders={orders}
                        onRemoveOrder={handleRemoveOrder}
                        onToggleStatus={handleToggleStatus}
                        shopname={config.shopname}
                        menu={menu}
                        unavailableItems={unavailableItems}
                        onToggleAvailability={handleToggleAvailability}
                        onLogout={handleLogout}
                        user={user}
                        customers={customers}
                        onProductAdd={handleProductAdd}
                        onProductDelete={handleProductDelete}
                    />
                )}
            </main>

            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onCheckout={(customer, total, paymentMethod, tableNumber) => handleCheckout(customer, total, paymentMethod, tableNumber)}
                customers={customers}
                isSelfOrder={isSelfOrder}
                localCustomer={localCustomer}
            />

            <BottomNav
                currentView={currentView}
                onViewChange={handleViewChange}
                hideAdmin={isSelfOrder}
            />
        </div>
    )
}

export default App
