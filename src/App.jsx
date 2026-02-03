import { useState, useEffect } from 'react'
import config from '../config.json'

function App() {
    return (
        <div className="app-container">
            <header>
                <h1>{config.shopname}</h1>
            </header>
            <main>
                <h2>Menu</h2>
                <div className="menu-grid">
                    {config.menu.map((item, index) => (
                        <div key={index} className="menu-item">
                            <h3>{item.itemname}</h3>
                            <p>Category: {item.catg}</p>
                            <p className="price">${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default App
