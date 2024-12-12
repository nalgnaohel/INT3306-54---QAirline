import React, { useRef, useState } from "react";
import "./Login.css";
import TopNavBar from "../../../components/Navbar/TopNavBar";

const Login: React.FC = () => {
    //const formRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const loginData = {
        email: email,
        password: password
    }

    var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailErr(false);
        setPasswordErr(false);
        if (email === '') {
            setEmailErr(true);
        } else if (password === '') {
            setPasswordErr(true);
        } else {
            
        }

    }
      
    return (
        <><TopNavBar />
        <div className="main-container" background-image>
            <div className="form-container">
                <form className="login-form" action="POST" onSubmit={handleSubmit}>
                    <h2>Đăng nhập QAirline</h2>
                    {/* Email */}
                    <label htmlFor="username">E-Mail</label>
                    <input type="email" name="username" placeholder="Email của bạn"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p
                        className={` ${emailErr ? 'show' : 'hide'}`}>Ten dang nhap khong duoc de trong</p>
                    {/* Password */}
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className={` ${passwordErr ? 'show' : 'hide'}`}>Mat khau khong duoc de trong</p>
                    <button type="submit">Đăng nhập</button>
                </form>
                <div className="toSignup">
                    <p>Bạn chưa có tài khoản? </p>
                    <a href="/signup">Đăng ký ngay</a>
                </div>
            </div>
        </div></>
    );
}

export default Login;