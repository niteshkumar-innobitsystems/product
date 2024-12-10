import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from '../css/checkout.module.css';
import Nav from './components/navbar'

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<any[]>([]);
    const [items, setItems] = useState<any[]>([]);

    // Function to get cart from localStorage
    const getCartFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    };

    // Function to get items list from localStorage
    const getItemsFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('itemList') || '[]');
    };

    // Function to handle quantity change in the cart
    const handleQuantityChange = (item: any, change: number) => {
        if (cart.length === 0) {
            alert('Your cart is empty! Please add items to the cart before making changes.');
            return;  // Prevent further action if the cart is empty
        }

        // Find the current stock for the item
        const availableStock = items.find((i) => i.name === item.name)?.quantity || 0;

        const updatedCart = cart.map((i) => {
            if (i.name === item.name) {
                let newQuantity = i.quantity + change;

                // Prevent quantity from going below 1
                if (newQuantity <= 0) {
                    newQuantity = 1;
                }

                // Prevent quantity from exceeding available stock
                if (newQuantity > availableStock) {
                    newQuantity = availableStock; // Limit to available stock
                }

                i.quantity = newQuantity;
            }
            return i;
        });

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
    };

    // Function to calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Function to handle checkout process and store sale information
    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty! Please add items to the cart before proceeding to checkout.');
            return;  // Prevent checkout if the cart is empty
        }

        const currentUser = JSON.parse(localStorage.getItem('loggedIn') || '{}');

        if (!currentUser.name) {
            alert("Please log in to complete the purchase.");
            navigate('/login');
            return;
        }

        // Update item quantities after checkout
        const updatedItems = items.map((item) => {
            // Find the purchased item in the cart and subtract the quantities
            const cartItem = cart.find((cartItem) => cartItem.name === item.name);
            if (cartItem) {
                item.quantity -= cartItem.quantity; // Subtract purchased quantity
            }
            return item;
        });

        // Save the updated items list to localStorage
        localStorage.setItem('itemList', JSON.stringify(updatedItems));

        // Save sale details to localStorage (User's name, purchased items, and total)
        const saleRecord = {
            user: currentUser.name,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: calculateTotal(),
            date: new Date().toLocaleString()
        };

        const salesHistory = JSON.parse(localStorage.getItem('salesHistory') || '[]');
        salesHistory.push(saleRecord);
        localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

        // Clear the cart from localStorage
        localStorage.removeItem('cart');
        alert('Checkout successful! Thank you for your purchase.');

        // Redirect to the shop page after checkout
        navigate('/shop');
    };

    useEffect(() => {
        // Load the cart and item list from localStorage when the component mounts
        setCart(getCartFromLocalStorage());
        setItems(getItemsFromLocalStorage());
    }, []);

    return (
        <div><Nav/>
        <div className={Style.checkoutContainer}>
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className={Style.cartItems}>
                    {cart.map((item, index) => (
                        <div key={index} className={Style.cartItem}>
                            <div className={Style.itemDetails}>
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                            </div>
                            <div className={Style.quantityControls}>
                                <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                            </div>
                            <p>Total: ₹{item.price * item.quantity}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className={Style.totalPrice}>
                <h3>Total: ₹{calculateTotal()}</h3>
            </div>
            <div className={Style.checkoutButton}>
                <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
        </div></div>
    );
};

export default Checkout;
