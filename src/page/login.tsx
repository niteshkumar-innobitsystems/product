import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from '../css/register.module.css';



function Register1() {
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");

    const navigate = useNavigate();

    const printtext = (e: React.FormEvent) => {
        e.preventDefault();

        // Get the list of users stored in localStorage
        const userList = JSON.parse(localStorage.getItem("userList") || "[]");

        const loginUser = { email, pass };

        console.log("Login User", loginUser);
        console.log("Stored Users", userList);

        // Check if the user already exists
        const user = userList.find((user: { name:string, email: string, pass: string }) => user.email === email, userList.pass === pass);
        console.log("Found User in List", user);

        if (!user) {
            alert("user id or password is wrong");
        } else if (user.email === loginUser.email && user.pass === loginUser.pass) {
            console.log("logged in")
            localStorage.setItem("loggedIn", JSON.stringify(user)); // Store the updated list
            alert("logged in Successful!");
            navigate("/shop"); // Navigate to login page after successful registration

        }else{
            alert("user id or password is wrong");
        }
    };

    const redirectSignup = () => {
        navigate("/Register");
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
                    <header>Sign In</header>
                    <form onSubmit={printtext}>
                        <div className={`${Styles.field} ${Styles.inputField}`}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={Styles.input} required
                            />
                        </div>
                        <div className={`${Styles.field} ${Styles.inputField}`}>
                            <input
                                type="password"
                                placeholder="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                className={Styles.password} required
                            />
                        </div>

                        <div className={`${Styles.field} ${Styles.buttonField}`}>
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
                    <div className={Styles.formLink}>
                        <span>Create Your Account Now. <a onClick={redirectSignup} className={`${Styles.link} ${Styles.loginLink}`}>Sign Up</a></span>
                    </div>
                </div>


            </div>
        </section>
    );
}

export default Register1;