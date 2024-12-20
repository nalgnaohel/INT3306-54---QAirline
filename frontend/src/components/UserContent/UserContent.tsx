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
            id: 'VN171',
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
            id: 'QH171',
            status: 'canceled',
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
            id: 'VJ171',
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
                        <div className='user-content-section'> 
                            <span className='user-content-label'>Mật khẩu</span>
                            <span className='user-content-label-data'>{accountData.password}</span>
                        </div>
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