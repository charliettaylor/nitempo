import "./login.css"
import { useRef } from "react";
import React from "react";

export default function Login() {

    const email = useRef();
    const password = useRef();
    const handleClick = (e) => {
        e.preventDefault();
        console.log(email.current.value)
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Nitempo</h3>
                    <span className="loginDesc">Listen, Vibe, Enjoy.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                        <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password} />
                        <button className="loginButton">Login</button>
                        <button className="loginRegister">Create a new account</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
