import React, { useRef, useState } from "react";
import "./Login.css";
import TopNavBar from "../../../components/Navbar/TopNavBar";
import {useNavigate} from 'react-router-dom';

const Login: React.FC = () => {
    //const formRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const emailMsgRef = useRef<HTMLParagraphElement>(null);
    const formData = {
        email: email,
        password: password
    }
    const navigator = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailErr(false);
        setPasswordErr(false);

        if (email === '') {
            setEmailErr(true);
            emailInputRef.current?.focus();
        } else if (password === '') {
            setPasswordErr(true);
            passwordInputRef.current?.focus();
        } else {
            try {
                const response = await fetch(
                    'http://127.0.0.1:5000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }
                );
                const data = await response.json();

                console.log('Data:', data);
                //create new token
                const token = data.user.token;
                const currentUser = data.user.user;

                localStorage.setItem('token', token);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                //debug
                console.log('Token:', token);
                console.log('Current User:', currentUser);

                //redirect to home page
                navigator('/');
            }
            catch (error) {
                setEmailErr(true);
                if (emailMsgRef.current) {
                    emailMsgRef.current.innerText = 'Email hoặc mật khẩu không đúng';
                }
                console.error('Unexpected Error:', error);
            }
        }

    }
      
    return (
        <><TopNavBar />
        <div className="main-container" background-image>
            <div className="login-form-container">
                <form className="login-form" action="POST" onSubmit={handleSubmit}>
                    <h2>Đăng nhập QAirline</h2>
                    {/* Email */}
                    <label htmlFor="username">E-Mail</label>
                    <input ref={emailInputRef} type="email" name="username" placeholder="Email của bạn"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p ref={emailMsgRef}
                        className={` ${emailErr ? 'show' : 'hide'}`}>Email khong duoc de trong</p>
                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className={` ${passwordErr ? 'show' : 'hide'}`}>Mat khau khong duoc de trong</p>
                    <button type="submit">Đăng nhập</button>
                </form>
                <div className="login-options">
                    <a href="/forgot-password">Quên mật khẩu?</a>
                </div>
                <div className="toSignup">
                    <p>Bạn chưa có tài khoản? </p>
                    <a href="/signup">Đăng ký ngay</a>
                </div>
            </div>
        </div></>
    );
}

export default Login;
