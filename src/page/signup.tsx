import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {



    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("User");
    const [password2, setPassword2]=useState<string>('');
    
    console.log(email,password,password2)
    
    const navigate = useNavigate();
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if(password===password2){

        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        
        const userExists = existingUsers.some((user: { email: string }) => user.email === email);
        if (userExists) {
            alert("User already exists. Please login.");
        } else {
            // Add new user to localStorage 
            const newUser = { email, password, role };
            console.log("NewUser",newUser)
            localStorage.setItem("users", JSON.stringify([existingUsers, newUser]));
            alert("Registration successful!");
            navigate("/login");
            console.log("existingUsers",existingUsers)
        }

        }else{
            alert("Mismatch Password")
        }
        

    };
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required minLength={10}
                    />
                </div>
                <div><label>Confirm Password</label>
                <input type="password" value={password2} onChange={(e)=>setPassword2(e.target.value)}/></div>
                
                <button type='submit'>Register</button>
                <p>
                    Already have an account? <a href='/login'>Login</a>
                </p>
            </form >
            
        </div >
    );
};
export default Register;

