import React, { useRef } from "react";
import Introduction from "../../../components/Introduction/Introduction";
import "./Login.css";

const Login: React.FC = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        console.log("Username:", usernameRef.current?.value);
        console.log("Password:", passwordRef.current?.value);
    }

    return (
        <div className="main-container" background-image>
            <div className="form-container">
                <form className="login-form" action="POST" onSubmit={handleSubmit}>
                    <h2>Đăng nhập QAirline</h2>
                    <label htmlFor="username">E-Mail</label>
                    <input type="email" name="username" placeholder="Email của bạn" ref={usernameRef} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" ref={passwordRef} />
                    <button type="submit">Đăng nhập</button>
                </form>
                <div className="toSignup">
                    <p>Bạn chưa có tài khoản? </p>
                    <a href="/signup">Đăng ký ngay</a>
                </div>
            </div>
        </div>
    );
}

export default Login;