import React, { useState, useEffect } from 'react';
import Nav from './components/navbar';
import Style from '../css/history.module.css';  // Import the CSS module

const History: React.FC = () => {
    const [userHistory, setUserHistory] = useState<any[]>([]);

    // Load existing items from localStorage when the page is loaded
    const currentUser = () => {
        return JSON.parse(localStorage.getItem('loggedIn') || '[]');
    };

    const storedHistory = () => {
        return JSON.parse(localStorage.getItem('salesHistory') || '[]');
    };

    useEffect(() => {
        const currentUserData = currentUser();
        const history = storedHistory();

        // Filter the history based on the logged-in user
        const filteredHistory = history.filter((entry: any) => entry.user === currentUserData.name);

        // Set the filtered history in the state
        setUserHistory(filteredHistory);
    }, []); // This effect runs once when the component is mounted

    return (
        <div>
            <Nav />
            <section className={Style.History}>
                <div className={Style.formContainer}>
                    <h2>User Sales History</h2>
                </div>

                <div className={Style.history}>
                    <h3>History:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userHistory.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>No sales history available.</td>
                                </tr>
                            ) : (
                                userHistory.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.items.map((item: any) => item.name).join(', ')}</td>
                                        <td>{entry.items.map((item: any) => item.description).join(', ')}</td>
                                        <td>₹{entry.totalAmount}</td>
                                        <td>{entry.items.map((item: any) => item.quantity).join(', ')}</td>
                                        <td>₹{entry.totalAmount}</td>
                                        <td>{entry.date}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default History;
