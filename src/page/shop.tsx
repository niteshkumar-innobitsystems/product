import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from '../css/shop.module.css';
import Nav from './components/navbar';

function Shop() {
    const [items, setItems] = useState<any[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    // Load items from localStorage on component mount
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('itemList') || '[]');
        setItems(storedItems);
    }, []);

    // Handle item purchase (add to cart)
    const handleBuyItem = (item: any, quantity: number) => {
        if (quantity > item.quantity) {
            alert(`Sorry, we only have ${item.quantity} of this item in stock.`);
            return;
        }
    
        const newCartItem = { ...item, quantity };
    
        const existingItemIndex = cart.findIndex((cartItem) => cartItem.productName === item.productName);
    
        let updatedCart;
        if (existingItemIndex > -1) {
            updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity = quantity;
        } else {
            updatedCart = [...cart, newCartItem];
        }
    
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateUniqueItemCount(updatedCart);
    };

    // Update unique item count in cart
    const updateUniqueItemCount = (cart: any[]) => {
        const uniqueItemsCount = new Set(cart.map((item) => item.productName)).size;
        console.log("Unique items in cart:", uniqueItemsCount);
    };

    // Function to handle quantity change for an item
    const handleQuantityChange = (item: any, change: number) => {
        const updatedItems = items.map((i) => {
            if (i.productName === item.productName) {
                let newQuantity = (i.selectedQuantity || 1) + change;
                if (newQuantity > i.quantity) {
                    newQuantity = i.quantity;
                    alert('Cannot exceed available stock!');
                } else if (newQuantity < 1) {
                    newQuantity = 1;
                    alert('Quantity must be at least 1');
                }
                i.selectedQuantity = newQuantity;
            }
            return i;
        });
        setItems(updatedItems);
    };

    // useEffect to count items in cart
    useEffect(() => {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(totalItems);
    }, [cart]);

    return (
        <div>
            <Nav />

            <section className={Style.shopContainer}>
                <div className={Style.itemList}>
                    <div className={Style.itemsGrid}>
                        {items.length === 0 ? (
                            <p>No items available</p>
                        ) : (
                            items.map((item, index) => (
                                <div key={index} className={Style.card}>
                                    <div className={Style.itemDetails}>
                                        <h3>{item.productName}</h3>
                                        <p>{item.productDescription}</p>
                                        <p className={Style.price}>Price: ₹{item.price}</p>
                                        <p>In Stock: {item.quantity}</p>
                                        
                                        <div className={Style.quantitySelector}>
                                            <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                                            <input
                                                type="number"
                                                value={item.selectedQuantity || 1}
                                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                            />
                                            <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                                        </div>

                                        <button className={Style.addToCartBtn} onClick={() => handleBuyItem(item, item.selectedQuantity || 1)}>Add to Cart</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shop;
