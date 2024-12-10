import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from '../../css/navbar.module.css';
import Cart from '../../asset/cart.png';

const Nav: React.FC = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(JSON.parse(localStorage.getItem('loggedIn') || '{}'));

    // Function to calculate unique item count from the cart
    const calculateUniqueItemCount = (cart: any[]) => {
        return new Set(cart.map(item => item.name)).size;
    };

    useEffect(() => {
        // Check if the user is logged in
        if (!currentUser.name || currentUser.name === 'object') {
            navigate('/restock');
        }
    }, [currentUser, navigate]);

    // Retrieve cart from localStorage and update the cart state
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    const handleNavigate = (path: string) => navigate(path);

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('cart');
        navigate('/login');
    };

    // Update cart state whenever cart is changed in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCart(updatedCart);
        };

        // Add event listener for 'storage' event to handle localStorage updates
        window.addEventListener('storage', handleStorageChange);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div>
            <div className={Style.nav}>
                <div className={Style.navMenuList} onClick={() => handleNavigate('/restock')}>Restock</div>
                <div className={Style.navMenuList} onClick={() => handleNavigate('/checkout')}>Cart</div>
                <div className={Style.navMenuList} onClick={() => handleNavigate('/history')}>History</div>
                <div className={Style.navMenuList} onClick={() => handleNavigate('/account')}>Account</div>
                <div className={Style.navSpace}></div>

                <div className={Style.navUserMessage}>Welcome, {currentUser.name}!</div>
                <div className={Style.navUserMessage}>
                    <img className={Style.navUserCart} src={Cart} alt="Cart" />
                    <div className={Style.navUserCartCount}>
                        {calculateUniqueItemCount(cart)} {/* Count of unique items */}
                    </div>
                </div>
                <div className={Style.navUserMessage}>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <h2></h2>
        </div>
    );
};

export default Nav;
