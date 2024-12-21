import React, { useState } from 'react';
import { useUserContext } from './UserContext';
import FlightList from './FlightList';
import './UserContent.css'

const UserContent: React.FC = () => {
    const { activeContent } = useUserContext();

    const [accountData, setAccountData] = useState({
        id: 'QH-12ULK165',
        phone: '+84123456789',
        email: 'abc@gmail.com',
        username: 'hehe',
        password: '12345678',
    })

    const [profile, setProfile] = useState({
        firstname: 'Văn A',
        lastname: 'Nguyễn',
        birthday: '01/01/2000',
        CCCD: '013456789012',
        nationality: 'Việt Nam',
    })

    const [flightData, setFlightData] = useState([
        {
            ticketid: 'VN-123HGH45',
            flightid: 'VN171',
            userid: 'QH-12ULK165',
            seatnumber: 'E5',
            ticketclass: 'Phổ thông',
            status: 'ongoing',
            from: 'Hà Nội',
            datefrom: '02 Thg 12 2024',
            timeFrom: '15:00',
            codeFrom: 'HAN',
            to: 'Tp. Hồ Chí Minh',
            dateto: '02 Thg 12 2024',
            timeTo: '17:00',
            codeTo: 'SGN',
            airline: 'VN',
        },
        {
            ticketid: 'VN-123HGH45',
            flightid: 'VN171',
            userid: 'QH-12ULK165',
            seatnumber: 'E5',
            ticketclass: 'Phổ thông',
            status: 'completed',
            from: 'Hà Nội',
            datefrom: '02 Thg 12 2024',
            timeFrom: '15:00',
            codeFrom: 'HAN',
            to: 'Tp. Hồ Chí Minh',
            dateto: '02 Thg 12 2024',
            timeTo: '17:00',
            codeTo: 'SGN',
            airline: 'QH',
        },
        {
            ticketid: 'VN-123HGH45',
            flightid: 'VN171',
            userid: 'QH-12ULK165',
            seatnumber: 'E5',
            ticketclass: 'Phổ thông',
            status: 'completed',
            from: 'Hà Nội',
            datefrom: '02 Thg 12 2024',
            timeFrom: '15:00',
            codeFrom: 'HAN',
            to: 'Tp. Hồ Chí Minh',
            dateto: '02 Thg 12 2024',
            timeTo: '17:00',
            codeTo: 'SGN',
            airline: 'VJ',
        },
      ])

    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordChange = () => {
        // Kiểm tra mật khẩu cũ
        if (oldPassword !== accountData.password) {
            setErrorMessage("Mật khẩu cũ không chính xác!");
            return;
        }

        // Kiểm tra mật khẩu mới
        if (newPassword !== confirmPassword) {
            setErrorMessage("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        // Cập nhật mật khẩu
        setAccountData((prev) => ({ ...prev, password: newPassword }));
        setIsEditingPassword(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMessage("");
        alert("Đổi mật khẩu thành công!");
    };

    return (
        <div className='user-content-container'>
            {activeContent == 0 && (
                <div className='user-content'>
                    <div className='user-content-header'>
                        <div className='user-content-title'>Tài khoản</div>
                    </div>
                    <div className='user-content-data'>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Mã người dùng</span>
                            <span className='user-content-label-data'>{accountData.id}</span>
                        </div>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Số điện thoại</span>
                            <span className='user-content-label-data'>{accountData.phone}</span>
                        </div>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Email</span>
                            <span className='user-content-label-data'>{accountData.email}</span>
                        </div>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Tên đăng nhập</span>
                            <span className='user-content-label-data'>{accountData.username}</span>
                        </div>
                        {!isEditingPassword ? (
                            <div className="user-content-section">
                                <span className="user-content-label">Mật khẩu</span>
                                <span className='user-content-label-data'>********</span>
                                <button
                                className="change-password-btn"
                                onClick={() => setIsEditingPassword(true)}
                                >
                                Đổi mật khẩu
                                </button>
                            </div>
                            ) : (
                            <div className="user-content-modal">
                                <div className='user-content-modal-section'>
                                    <div className="user-content-modal-label">Mật khẩu cũ</div>
                                    <input
                                        className='user-content-label-input'
                                        placeholder='Nhập mật khẩu hiện tại'
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className='user-content-modal-section'>
                                    <div className="user-content-modal-label">Mật khẩu mới</div>
                                    <input
                                        className='user-content-label-input'
                                        placeholder='Nhập mật khẩu mới'
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className='user-content-modal-section'>
                                    <div className="user-content-modal-label">Xác nhận mật khẩu</div>
                                    <input
                                        className='user-content-label-input'
                                        placeholder='Nhập lại mật khẩu mới'
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <div>
                                    <button className="user-comfirm-button"onClick={handlePasswordChange}>Lưu mật khẩu</button>
                                    <button className='user-cancel-button' onClick={() => {
                                        setIsEditingPassword(false);
                                        setErrorMessage("");
                                    }}>Hủy bỏ</button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            )}
            {activeContent == 1 && (
                <div className='user-content'>
                    <div className='user-content-header'>
                        <div className='user-content-title'>Thông tin cá nhân</div>
                    </div>
                    <div className='user-content-data'>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Họ</span>
                            <span className='user-content-label-data'>{profile.lastname}</span>
                        </div>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Tên đệm và tên</span>
                            <span className='user-content-label-data'>{profile.firstname}</span>
                        </div>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Ngày sinh</span>
                            <span className='user-content-label-data'>{profile.birthday}</span>
                        </div>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Số CCCD</span>
                            <span className='user-content-label-data'>{profile.CCCD}</span>
                        </div>
                        <div className='user-content-section'>
                            <span className='user-content-label'>Quốc tịch</span>
                            <span className='user-content-label-data'>{profile.nationality}</span>
                        </div>
                    </div>
                </div>
            )}
            {activeContent == 2 && (
                <div className='user-flight-list'>
                    <FlightList flights={flightData} />
                </div>
            )}
            {activeContent == 3 && (
                <div className='user-content'>
                <div className='user-content-header'>
                    <div className='user-content-title'>Đăng xuất</div>
                </div>
                <div className='user-content-data'>
                    <div className='user-content-label-logout'>Bạn có chắc muốn đăng xuất?</div>
                    <button className='user-content-confirm-btn'>Có</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default UserContent;