-- DOWN
DROP TABLE if EXISTS users;
DROP TABLE if EXISTS flights;
DROP TABLE if EXISTS tickets;


-- UP
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    title TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    dob TIMESTAMP DEFAULT NOW() NOT NULL,
    gender TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    avatar TEXT,
    nationality TEXT NOT NULL,
    type TEXT NOT NULL,
    identity_no VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (user_id, title, first_name, last_name, dob, gender, email,
 password, phone_number, avatar, nationality, type, identity_no, created_at, updated_at) 
VALUES (default, 'Miss', 'Hoang Lan', 'Le', '2004-01-08 00:00:00.000000', 'Female', 'lanlehoang8124@gmail.com',
'$2a$10$h7A2gZQhDur0.DWme0Jdv./6PIuIVZwcLWNdgIpESFjFGy.LgLGNi', '0987654321', 'https://www.google.com', 'Vietnamese', 'admin', '001123456789', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661');
-- CREATE TABLE IF NOT EXISTS flights (
--     flight_id UUID PRIMARY KEY,
--     airline_id UUID NOT NULL,
--     departure_airport_id UUID NOT NULL,
--     arrival_airport_id UUID NOT NULL,
--     departure_date TIMESTAMP NOT NULL,
--     arrival_date TIMESTAMP NOT NULL,
--     price DECIMAL NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );

CREATE TABLE IF NOT EXISTS flights (
    flight_id VARCHAR(255) PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    departure VARCHAR(255) NOT NULL,
    arrival VARCHAR(255) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    available_seats INT NOT NULL
);

-- Dữ liệu mẫu cho bảng flights (Chuyến bay trong nước Việt Nam)
INSERT INTO flights (flight_id, brand, departure, arrival, departure_time, arrival_time, price, available_seats) VALUES
('FL001', 'Vietnam Airlines', 'Hà Nội', 'Hồ Chí Minh', '2024-12-25 08:00:00', '2024-12-25 10:30:00', 1500.00, 100),
('FL002', 'VietJet Air', 'Hồ Chí Minh', 'Hà Nội', '2024-12-26 09:00:00', '2024-12-26 11:30:00', 1200.00, 120),
('FL003', 'Bamboo Airways', 'Đà Nẵng', 'Hà Nội', '2024-12-27 07:30:00', '2024-12-27 09:45:00', 1000.00, 80),
('FL004', 'Vietnam Airlines', 'Hồ Chí Minh', 'Đà Nẵng', '2024-12-28 14:00:00', '2024-12-28 16:00:00', 1300.00, 90),
('FL005', 'VietJet Air', 'Hà Nội', 'Đà Nẵng', '2024-12-29 12:30:00', '2024-12-29 14:30:00', 1100.00, 75),
('VN001', 'Vietnam Airlines', 'Hà Nội', 'Hồ Chí Minh', '2024-12-10 10:00:00', '2024-12-10 12:30:00', 1000.00, 50),
('VN002', 'Vietnam Airlines', 'Hà Nội', 'Đà Nẵng', '2024-12-10 15:00:00', '2024-12-10 16:30:00', 1200.00, 30),
('VN003', 'Vietnam Airlines', 'Hà Nội', 'Phú Quốc', '2024-12-11 08:00:00', '2024-12-11 10:30:00', 1500.00, 20),
('VJ001', 'VietJet Air', 'Hà Nội', 'Hồ Chí Minh', '2024-12-12 09:00:00', '2024-12-12 11:30:00', 900.00, 100),
('VJ002', 'VietJet Air', 'Hà Nội', 'Đà Nẵng', '2024-12-12 14:00:00', '2024-12-12 15:30:00', 950.00, 75),
('VJ003', 'VietJet Air', 'Hà Nội', 'Phú Quốc', '2024-12-13 07:00:00', '2024-12-13 09:30:00', 1400.00, 40),
('BL001', 'Bamboo Airways', 'Hồ Chí Minh', 'Hà Nội', '2024-12-10 11:00:00', '2024-12-10 13:30:00', 1100.00, 60),
('BL002', 'Bamboo Airways', 'Đà Nẵng', 'Hà Nội', '2024-12-10 16:00:00', '2024-12-10 17:30:00', 1300.00, 25),
('BL003', 'Bamboo Airways', 'Phú Quốc', 'Hà Nội', '2024-12-11 09:00:00', '2024-12-11 11:30:00', 1600.00, 50);


CREATE TABLE IF NOT EXISTS tickets (
    ticket_id VARCHAR(255) PRIMARY KEY,
    flight_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    seat_number VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    departure VARCHAR(255) NOT NULL,
    arrival VARCHAR(255) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    booked_at TIMESTAMP NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES flights(flight_id) ON DELETE CASCADE
); 

-- Dữ liệu mẫu cho bảng tickets
INSERT INTO tickets (ticket_id, flight_id, user_id, seat_number, price, departure, arrival, departure_time, arrival_time, booked_at) VALUES
('T001', 'FL001', 'U001', '1A', 1500.00, 'Hà Nội', 'Hồ Chí Minh', '2024-12-25 08:00:00', '2024-12-25 10:30:00', '2024-12-20 12:00:00'),
('T002', 'FL002', 'U002', '2B', 1200.00, 'Hồ Chí Minh', 'Hà Nội', '2024-12-26 09:00:00', '2024-12-26 11:30:00', '2024-12-21 14:30:00'),
('T003', 'FL003', 'U003', '3C', 1000.00, 'Đà Nẵng', 'Hà Nội', '2024-12-27 07:30:00', '2024-12-27 09:45:00', '2024-12-22 16:45:00'),
('T004', 'FL004', 'U004', '4D', 1300.00, 'Hồ Chí Minh', 'Đà Nẵng', '2024-12-28 14:00:00', '2024-12-28 16:00:00', '2024-12-23 09:15:00'),
('T005', 'FL005', 'U005', '5E', 1100.00, 'Hà Nội', 'Đà Nẵng', '2024-12-29 12:30:00', '2024-12-29 14:30:00', '2024-12-24 18:30:00');
