import React, { useState } from 'react';
import Nav from './components/navbar';
import Style from '../css/restock.module.css';  // Import the CSS module

const Account: React.FC = () => {
    // State for item properties
    const [itemOldPassword, setItemOldPassword] = useState('');
    const [itemNewPassword1, setItemNewPassword1] = useState('');
    const [itemNewPassword2, setItemNewPassword2] = useState('');

    // console.log("itemOldPassword", itemOldPassword);
    // console.log("itemNewPassword1", itemNewPassword1);
    // console.log("itemNewPassword2", itemNewPassword2);

    // Load existing items from localStorage when the page is loaded
    const userList = JSON.parse(localStorage.getItem("userList") || "[]");

    const currentUser = JSON.parse(localStorage.getItem('loggedIn') || '{}');
    console.log(currentUser.email);

    const filteredUser = userList.filter((user: { email: string }) => user.email === currentUser.email);

    if (filteredUser.length === 0) {
        // console.log('User not found');
        return null;  // Early exit if no user is found
    }

    console.log(filteredUser[0].pass);

    // Handle adding a new item to stock (changing the password)
    const handleChangePassword = () => {
        if (!itemOldPassword || !itemNewPassword1 || !itemNewPassword2) {
            alert('Please fill in all fields');
            return;
        }

        if (itemOldPassword === filteredUser[0].pass) {
            // console.log("Match Old Password");

            if (itemNewPassword1 === itemNewPassword2 && itemNewPassword1 !== "") {
                // Update the password
                filteredUser[0].pass = itemNewPassword1;
                // console.log("Password Updated");

                // Save the updated userList back to localStorage
                localStorage.setItem("userList", JSON.stringify(userList));

                localStorage.setItem("loggedIn", JSON.stringify(filteredUser[0]));

                // Reset the form fields
                setItemOldPassword('');
                setItemNewPassword1('');
                setItemNewPassword2('');

                alert('Password changed successfully');
            } else {
                alert('New passwords do not match');
            }
        } else {
            alert('Old password is incorrect');
        }
    };

    return (
        <div>
            <Nav />
            <section className={Style.Account}>
                <div className={Style.formContainer}>
                    <h2>Account</h2>
                    <h4>Change Password</h4>
                    <br />
                    <form>
                        <div className={Style.formGroup}>
                            <label>Old Password</label>
                            <input
                                type="text"
                                value={itemOldPassword}
                                onChange={(e) => setItemOldPassword(e.target.value)}
                                placeholder="Enter old password"
                            />
                        </div>
                        <div className={Style.formGroup}>
                            <label>New Password</label>
                            <input
                                type="text"
                                value={itemNewPassword1}
                                onChange={(e) => setItemNewPassword1(e.target.value)}
                                placeholder="New Password"
                            />
                        </div>
                        <div className={Style.formGroup}>
                            <label>Confirm Password</label>
                            <input
                                type="text"
                                value={itemNewPassword2}
                                onChange={(e) => setItemNewPassword2(e.target.value)}
                                placeholder="Confirm Password"
                            />
                        </div>

                        <button type="button" className={Style.submitBtn} onClick={handleChangePassword}>
                            Change Password
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Account;
