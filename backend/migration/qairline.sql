-- DOWN
DROP TABLE if EXISTS users;
DROP TABLE if EXISTS flights;
DROP TABLE if EXISTS airports;

-- UP
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    title TEXT NOT NULL,
    first_name TEXT CHARACTER SET utf8mb4 NOT NULL,
    last_name TEXT CHARACTER SET utf8mb4 NOT NULL,
    dob TIMESTAMP DEFAULT NOW() NOT NULL,
    gender TEXT CHARACTER SET utf8mb4 NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    avatar TEXT,
    nationality TEXT CHARACTER SET utf8mb4 NOT NULL,
    type TEXT NOT NULL,
    identity_no VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL ,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL 
);

CREATE TABLE IF NOT EXISTS airports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT CHARACTER SET utf8mb4 NOT NULL,
    city TEXT CHARACTER SET utf8mb4 NOT NULL,
    country TEXT CHARACTER SET utf8mb4 NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    iata_code VARCHAR(255) NOT NULL,
    UNIQUE KEY (iata_code)
);

CREATE TABLE IF NOT EXISTS aircrafts (
    aircraft_id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255) NOT NULL DEFAULT 'Boeing 787',
    manufacturer VARCHAR(255) NOT NULL ,
    economy_class_seats INT NOT NULL DEFAULT 50,
    business_class_seats INT NOT NULL DEFAULT 50,
    first_class_seats INT NOT NULL DEFAULT 50,
    premium_class_seats INT NOT NULL DEFAULT 50,
    total_seats INT NOT NULL DEFAULT 200,
    range_in_km INT NOT NULL DEFAULT 1000,
    description TEXT CHARACTER SET utf8mb4
);


CREATE TABLE if not exists flights (
    id int AUTO_INCREMENT PRIMARY KEY,
    flight_id VARCHAR(255) NOT NULL DEFAULT 'VN 0000',
    brand VARCHAR(255) NOT NULL DEFAULT 'Vietnam Airlines',
    departure_code VARCHAR(255) NOT NULL default 'HAN',
    arrival_code VARCHAR(255) NOT NULL default 'SGN',
    departure_time TIMESTAMP NOT NULL default current_timestamp,
    arrival_time TIMESTAMP NOT NULL default '2024-12-31 00:00:00',
    aircraft_id int NOT NULL default 0,
    price DECIMAL NOT NULL default 1000000,
    available_seats int NOT NULL default 100,
    status VARCHAR(255) NOT NULL default 'on-time',
    FOREIGN KEY (departure_code) REFERENCES airports(iata_code),
    FOREIGN KEY (arrival_code) REFERENCES airports(iata_code),
    FOREIGN KEY (aircraft_id) REFERENCES aircrafts(aircraft_id)
);

-- ALTER TABLE `qairline-dtb`.`flights` ADD FOREIGN KEY (`aircraft_id`) REFERENCES `qairline-dtb`.`aircrafts` (`aircraft_id`);
-- alter TABLE `qairline-dtb`.`flights` ADD FOREIGN KEY (`departure_code`) REFERENCES `qairline-dtb`.`airports` (`iata_code`);
-- alter TABLE `qairline-dtb`.`flights` ADD FOREIGN KEY (`arrival_code`) REFERENCES `qairline-dtb`.`airports` (`iata_code`);

INSERT INTO users (user_id, title, first_name, last_name, dob, gender, email,
 password, phone_number, avatar, nationality, type, identity_no, created_at, updated_at) 
VALUES ('7443c342-2e94-46d5-ad31-3c821f74a5b6', 'Miss', N'Hoàng Lan', N'Lê', '2004-01-08 00:00:00.000000', 'Female', 'lanlehoang8124@gmail.com',
'$2a$10$aKQK38H/HJ7HvC6je2U7G.BW2.PVUpcYfPUI.9996/6a1KAaZbo3a', '0987654321', 'https://www.google.com', 'Vietnamese', 'admin', '001123456789', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661');

INSERT INTO airports (id, name, city, country, created_at, updated_at, iata_code) 
VALUES (1, N'Sân bay Quốc tế Nội Bài', N'Hà Nội', N'Việt Nam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661', 'HAN');
INSERT INTO airports (id, name, city, country, created_at, updated_at, iata_code)
VALUES (2, N'Sân bay Quốc tế Tân Sơn Nhất', N'Hồ Chí Minh', N'Việt Nam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661', 'SGN');
INSERT INTO airports (id, name, city, country, created_at, updated_at, iata_code)
VALUES (3, N'Sân bay Quốc tế Đà Nẵng', N'Đà Nẵng', N'Việt Nam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661', 'DAD');
INSERT INTO airports (id, name, city, country, created_at, updated_at, iata_code)
VALUES (4, N'Sân bay Quốc tế Cam Ranh', N'Khánh Hòa', N'Việt Nam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661', 'CXR');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES (1, 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');
INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES (2, 'Boeing 787', 'Boeing', 150, 50, 50, 50, 300, 10000, N'Máy bay Boeing 787 là dòng máy bay thân rộng có sức chứa trên 270 ghế ngồi.');
INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES (3, 'Airbus 350', 'Airbus', 231, 45, 29, 0, 305, 14350, N'Airbus A350 là loại máy đầu tiên sử dụng sợi carbon cường polymer cho thiết kế cả thân và máy bay để tăng độ cường chịu lực va chạm.');

INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`) VALUES (1, 'VN 7237', 'Vietnam Airlines', 'HAN', 'SGN', '2024-12-18 18:45:00', '2024-12-18 20:50:00', 2, 2955000, 160, 'on-time');
INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`) VALUES (2, 'VN 219', 'Vietnam Airlines', 'HAN', 'SGN', '2024-12-18 19:00:00', '2024-12-18 21:10:00', 2, 3000000, 100, 'on-time');
INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `status`) VALUES (3, 'VN 205', 'HAN', 'SGN', '2024-12-21 05:00:00', '2024-12-21 07:10:00', 1, 2728000, 'on-time');
INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `status`) VALUES (4, 'VN 7243', 'HAN', 'SGN', '2024-12-21 05:10:00', '2024-12-21 07:20:00', 1, 2728000, 'on-time');
INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`) VALUES (5, 'VN 243', 'HAN', 'SGN', '2024-12-21 06:00:00', '2024-12-21 08:15:00', 1, 2955000, 150, 'on-time');



