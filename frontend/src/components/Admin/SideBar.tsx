import React from "react";
import "../../css/Admin/SideBar.css";
const SideBar: React.FC = () => {
return (
<div className="box-2">
    <div className="side-bar">
        <div className="overlap">
            <div className="logout">
                <div className="products">
                    <div className="text-wrapper-3">Đăng xuất</div>
                </div>
            </div>
                <div className="settings">
                    <div className="products">
                        <div className="text-wrapper-3">Cài đặt</div>
                </div>
            </div>
            <div className="user">
                <div className="products">
                    <div className="text-wrapper-3">Người dùng</div>
                </div>
            </div>
            <div className="airlines">
                <div className="products">
                    <div className="text-wrapper-3">Hãng bay</div>
                </div>
            </div>
            <div className="airport">
                <div className="products">
                    <div className="text-wrapper-3">Sân bay</div>
                </div>
            </div>
            <div className="flights">
                <div className="products">
                    <div className="text-wrapper-3">Chuyến bay</div>
                </div>
            </div>
            <div className="booked">
                <div className="products">
                    <div className="text-wrapper-3">Đặt chỗ</div>
                </div>
            </div>
            <div className="home">
                <div className="products">
                    <div className="text-wrapper-3">Trang chủ</div>
                </div>
            </div>
            <p className="bright-web">
                <span className="span">QARILINE </span>
                <span className="text-wrapper-4">HỆ THỐNG ĐẶT CHỖ TRỰC TUYẾN</span>
            </p>
            <div className="divider"></div>
            <div className="separator"></div>
        </div>
    </div>
</div>
);
};

export default SideBar;