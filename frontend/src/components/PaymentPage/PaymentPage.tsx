import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import TopNavBar from "../Navbar/TopNavBar";
import Footer from "../Footer/Footer";
import UserNavBar from "../UserNavbar/UserNavbar"
import { UserProvider } from "../UserContent/UserContext";

const PaymentPage: React.FC = () => {
  // Chuyển hướng đến trang thanh toán
  const navigate = useNavigate();

  const handleConfirmPayment = () => {
    navigate("/");
  };
  return (
    <>
      <UserProvider>
        {localStorage.getItem('currentUser') === null ? <TopNavBar /> : <UserNavBar />}
      </UserProvider>
      <div className="payment-container">
        <h2 className="payment-title">Thanh Toán</h2>
        <p className="payment-description">
          Vui lòng chọn phương thức thanh toán của bạn.
        </p>

        <div className="payment-methods">
          <div className="payment-method">
            <img
              src="https://img.icons8.com/?size=100&id=200&format=png&color=000000"
              alt="Credit Card"
            />
            <p>Thẻ tín dụng / Thẻ ghi nợ</p>
          </div>

          <div className="payment-method">
            <img
              src="https://img.icons8.com/color/96/paypal.png"
              alt="PayPal"
            />
            <p>PayPal</p>
          </div>

          <div className="payment-method">
            <img src="https://img.icons8.com/color/96/cash.png" alt="Cash" />
            <p>Thanh toán khi nhận vé</p>
          </div>

          <div className="payment-method">
            <img
              src="https://img.icons8.com/color/96/bank.png"
              alt="Bank Transfer"
            />
            <p>Chuyển khoản ngân hàng</p>
          </div>
        </div>

        <button className="confirm-button" onClick={handleConfirmPayment}>
          Xác nhận thanh toán
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
