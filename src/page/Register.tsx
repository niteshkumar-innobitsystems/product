import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from '../css/register.module.css';



function Register1() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");

    const navigate = useNavigate();

    const printtext = (e: React.FormEvent) => {
        // e.preventDefault();

        // Get the list of users stored in localStorage
        const userList = JSON.parse(localStorage.getItem("userList") || "[]");

        const newUser = { name, email, pass };

        console.log("New User", newUser);
        console.log("Stored Users", userList);

        // Check if the user already exists
        const user = userList.find((user: { email: string }) => user.email === email);
        console.log("Found User in List", user);

        if (user) {
            alert("User already exists.");
        } else {
            // Register new user
            userList.push(newUser); // Append new user to the existing list
            localStorage.setItem("userList", JSON.stringify(userList)); // Store the updated list
            alert("Registration Successful!");
            navigate("/login"); // Navigate to login page after successful registration
        }
    };

    const redirectLogin=()=>{
        navigate("/login");
    }
    return (
        // <div className={Styles.container}>
        //     <div className={Styles.form}>
        //         <div className={Styles.title}>
        //             Register Now
        //         </div>
        //         <form onSubmit={printtext}>
        //             <div className={Styles.section10}>
        //                 <input
        //                     value={name}
        //                     type="text"
        //                     placeholder="Name"
        //                     onChange={(e) => setName(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className={Styles.section10}>
        //                 <input
        //                     value={email}
        //                     type="email"
        //                     placeholder="Email"
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className={Styles.section10}>
        //                 <input
        //                     value={pass}
        //                     type="password"
        //                     placeholder="Password"
        //                     onChange={(e) => setPass(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className={Styles.section10}>
        //                 <button type="submit">signup</button>
        //             </div>
        //             <div className={Styles.section10}>
        //                 <hr/>
        //             </div> <div className={Styles.section10}>
        //                 <button type="submit">signup</button>
        //             </div> <div className={Styles.section10}>
        //                 <button type="submit">signup</button>
        //             </div>
        //         </form>
        //     </div>
        
            <section className={`${Styles.container} ${Styles.forms}`}>
                
               {/* Signup Form */}
                <div className={`${Styles.form} ${Styles.signup}`}>
                    <div className={Styles.formContent}>
                        <header>Signup</header>
                        <form onSubmit={printtext}>
                            <div className={`${Styles.field} ${Styles.inputField}`}>
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className={Styles.input} required
                                />
                            </div>
                            <div className={`${Styles.field} ${Styles.inputField}`}>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className={Styles.input}  required
                                />
                            </div>
                            <div className={`${Styles.field} ${Styles.inputField}`}>
                                <input 
                                    type="password" 
                                    placeholder="Create password" 
                                    value={pass} 
                                    onChange={(e) => setPass(e.target.value)} 
                                    className={Styles.password} required
                                />
                            </div>
                            
                            <div className={`${Styles.field} ${Styles.buttonField}`}>
                                <button type="submit">Signup</button>
                            </div>
                        </form>
                        <div className={Styles.formLink}>
                            <span>Already have an account? <a onClick={redirectLogin} className={`${Styles.link} ${Styles.loginLink}`}>Login</a></span>
                        </div>
                    </div>
                   
                    
                </div>
            </section>
        );
    }
    
    export default Register1;