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

CREATE TABLE if NOT EXISTS promotions (
    id int AUTO_INCREMENT PRIMARY KEY,
    promo_id varchar(255) NOT NULL DEFAULT 'PRO0000',
    title varchar(255) NOT NULL DEFAULT 'Untitle',
    content text NOT NULL,
    amount int NOT NULL DEFAULT 0,
    UNIQUE KEY (promo_id)
);

CREATE TABLE IF NOT EXISTS aircrafts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aircraft_id VARCHAR(255) NOT NULL default 'VN-A588',
    model VARCHAR(255) NOT NULL DEFAULT 'Boeing 787',
    manufacturer VARCHAR(255) NOT NULL ,
    economy_class_seats INT NOT NULL DEFAULT 50,
    business_class_seats INT NOT NULL DEFAULT 50,
    first_class_seats INT NOT NULL DEFAULT 50,
    premium_class_seats INT NOT NULL DEFAULT 50,
    total_seats INT NOT NULL DEFAULT 200,
    range_in_km INT NOT NULL DEFAULT 1000,
    description TEXT CHARACTER SET utf8mb4,
    unique key (aircraft_id)
);


CREATE TABLE if not exists flights (
    id int AUTO_INCREMENT PRIMARY KEY,
    flight_id VARCHAR(255) NOT NULL DEFAULT 'VN 0000',
    brand VARCHAR(255) NOT NULL DEFAULT 'Vietnam Airlines',
    departure_code VARCHAR(255) NOT NULL default 'HAN',
    arrival_code VARCHAR(255) NOT NULL default 'SGN',
    departure_time TIMESTAMP NOT NULL default current_timestamp,
    arrival_time TIMESTAMP NOT NULL default '2024-12-31 00:00:00',
    aircraft_id VARCHAR(255) NOT NULL default 'VN-A588',
    price DECIMAL NOT NULL default 1000000,
    available_seats int NOT NULL default 100,
    status VARCHAR(255) NOT NULL default 'on-time',
    FOREIGN KEY (departure_code) REFERENCES airports(iata_code),
    FOREIGN KEY (arrival_code) REFERENCES airports(iata_code),
    FOREIGN KEY (aircraft_id) REFERENCES aircrafts(aircraft_id),
    UNIQUE KEY (flight_id)
);

-- ALTER TABLE `qairline-dtb`.`flights` ADD FOREIGN KEY (`aircraft_id`) REFERENCES `qairline-dtb`.`aircrafts` (`aircraft_id`);
-- alter TABLE `qairline-dtb`.`flights` ADD FOREIGN KEY (`departure_code`) REFERENCES `qairline-dtb`.`airports` (`iata_code`);
-- alter TABLE `qairline-dtb`.`flights` ADD FOREIGN KEY (`arrival_code`) REFERENCES `qairline-dtb`.`airports` (`iata_code`);

INSERT INTO users (user_id, title, first_name, last_name, dob, gender, email,
 password, phone_number, avatar, nationality, type, identity_no, created_at, updated_at) 
VALUES ('7443c342-2e94-46d5-ad31-3c821f74a5b6', 'miss', N'Hoàng Lan', N'Lê', '2004-01-08 00:00:00.000000', 'female', 'lanlehoang8124@gmail.com',
'$2a$10$aKQK38H/HJ7HvC6je2U7G.BW2.PVUpcYfPUI.9996/6a1KAaZbo3a', '0987654321', 'https://www.google.com', N'Việt Nam', 'admin', '001123456789', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661');
INSERT INTO users (user_id, title, first_name, last_name, dob, gender, email,
 password, phone_number, avatar, nationality, type, identity_no, created_at, updated_at) 
VALUES ('4c51336d-17b0-420e-86f1-6b00d7090f9c', 'mr', N'Huy Luân', N'Văn', '2003-02-01 07:00:00', 'male', 'vanhuyluan2003@gmail.com',
'$2a$10$SKG42QLXfXUkBCcLP3xPFuGEDjXp36i3llYQVTAUDewCBgkP6.hEe', '0904200402', 'https://www.gravatar.com/avatar/', N'Việt Nam', 'admin', '001102017836', '2024-12-20 21:59:39', '2024-12-20 21:59:39');
INSERT INTO users (user_id, title, first_name, last_name, dob, gender, email,
 password, phone_number, avatar, nationality, type, identity_no, created_at, updated_at) 
VALUES ('ca4096e9-6c16-46fe-982c-34c74026d8ff', 'mr', N'Đức Hùng', N'Hà', '2000-07-08 07:00:00', 'male', 'hungkhiyb@gmail.com',
'$2a$10$5BPH0fGzLQjfmmGPKSuG8.fcTqjCpzcj52QSzxKNPbvJru8BIbZ4y', '0908070605', 'https://www.gravatar.com/avatar/', N'Việt Nam', 'admin', '001101001002', '2024-12-20 22:03:24', '2024-12-20 22:03:24');
INSERT INTO users (user_id, title, first_name, last_name, dob, gender, email,
 password, phone_number, avatar, nationality, type, identity_no, created_at, updated_at)
VALUES ('d8cdf331-63f3-44b5-8728-cc21206d0e58', 'mrs', N'Thị Thuý Phương', N'Lê', '1970-01-31 08:00:00', 'female', 'lethithuyphuong313@gmail.com', '$2a$10$t7506b/W8.ZagcaDGEiGzOdXJvZBzmg4OsipKjN14eq69zrgQFscS', '0904234689', 'https://www.gravatar.com/avatar/', N'Việt Nam', 'client', '001303021012', '2024-12-20 22:06:04', '2024-12-20 22:06:04');

INSERT INTO airports (id, name, city, country, created_at, updated_at, iata_code) 
VALUES (1, N'Sân bay Quốc tế Nội Bài', N'Hà Nội', N'Việt Nam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661', 'HAN');
INSERT INTO airports (id, name, city, country, created_at, updated_at, iata_code)
VALUES (2, N'Sân bay Quốc tế Tân Sơn Nhất', N'Hồ Chí Minh', N'Việt Nam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661', 'SGN');
INSERT INTO airports (id, name, city, country, created_at, updated_at, iata_code)
VALUES (3, N'Sân bay Quốc tế Đà Nẵng', N'Đà Nẵng', N'Việt Nam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661', 'DAD');
INSERT INTO airports (id, name, city, country, created_at, updated_at, iata_code)
VALUES (4, N'Sân bay Quốc tế Cam Ranh', N'Khánh Hòa', N'Việt Nam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661', 'CXR');
INSERT INTO `qairline-dtb`.`airports` (`id`, `name`, `city`, `country`, `iata_code`) VALUES (5, N'Sân bay Quốc tế Cần Thơ', N'Cần Thơ', N'Việt Nam', 'VCA');
INSERT INTO `qairline-dtb`.`airports` (`id`, `name`, `city`, `country`, `iata_code`) VALUES (6, N'Sân bay Quốc tế Vinh', N'Vinh', N'Việt Nam', 'VII');
INSERT INTO `qairline-dtb`.`airports` (`id`, `name`, `city`, `country`, `iata_code`) VALUES (7, N'Sân bay Paris Charles de Gaulle', 'Paris', N'Pháp', 'CDG');
INSERT INTO `qairline-dtb`.`airports` (`id`, `name`, `city`, `country`, `iata_code`) VALUES (8, N'Sân bay Amsterdam, Hà Lan', 'Amsterdam', N'Hà Lan', 'AMS');
INSERT INTO `qairline-dtb`.`airports` (`id`, `name`, `city`, `country`, `iata_code`) VALUES (9, N'Sân bay London - Heathrow', 'London', 'Anh', 'LHR');
INSERT INTO `qairline-dtb`.`airports` (`id`, `name`, `city`, `country`, `iata_code`) VALUES (10, N'Sân bay Frankfurt', 'Frankfurt', N'Đức', 'FRA');

INSERT INTO promotions (id, promo_id, title, content, amount)
VALUES (1, 'PRO0001', N'Giảm giá 10%', N'Giảm giá 10% cho tất cả các chuyến bay', 10);

INSERT INTO promotions (id, promo_id, title, content, amount)
VALUES (2, 'PRO0002', N'QAirline được 1 năm tuổi', N'Mừng kỷ niệm 1 năm tuổi của QAirline', 0);

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A324', 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A325', 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A326', 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A327', 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A328', 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A329', 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A330', 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A331', 'Airbus 321', 'Airbus', 100, 50, 50, 0, 200, 10000, N'Máy bay Airbus A321 là dòng máy bay thân hẹp có sức chứa không quá 200 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A886', 'Airbus 350', 'Airbus', 231, 45, 29, 0, 305, 14350, N'Airbus A350 là loại máy đầu tiên sử dụng sợi carbon cường polymer cho thiết kế cả thân và máy bay để tăng độ cường chịu lực va chạm.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A887', 'Airbus 350', 'Airbus', 231, 45, 29, 0, 305, 14350, N'Airbus A350 là loại máy đầu tiên sử dụng sợi carbon cường polymer cho thiết kế cả thân và máy bay để tăng độ cường chịu lực va chạm.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A888', 'Airbus 350', 'Airbus', 231, 45, 29, 0, 305, 14350, N'Airbus A350 là loại máy đầu tiên sử dụng sợi carbon cường polymer cho thiết kế cả thân và máy bay để tăng độ cường chịu lực va chạm.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A889', 'Airbus 350', 'Airbus', 231, 45, 29, 0, 305, 14350, N'Airbus A350 là loại máy đầu tiên sử dụng sợi carbon cường polymer cho thiết kế cả thân và máy bay để tăng độ cường chịu lực va chạm.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A890', 'Airbus 350', 'Airbus', 231, 45, 29, 0, 305, 14350, N'Airbus A350 là loại máy đầu tiên sử dụng sợi carbon cường polymer cho thiết kế cả thân và máy bay để tăng độ cường chịu lực va chạm.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A891', 'Airbus 350', 'Airbus', 231, 45, 29, 0, 305, 14350, N'Airbus A350 là loại máy đầu tiên sử dụng sợi carbon cường polymer cho thiết kế cả thân và máy bay để tăng độ cường chịu lực va chạm.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A892', 'Airbus 350', 'Airbus', 231, 45, 29, 0, 305, 14350, N'Airbus A350 là loại máy đầu tiên sử dụng sợi carbon cường polymer cho thiết kế cả thân và máy bay để tăng độ cường chịu lực va chạm.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A861', 'Boeing 787', 'Boeing', 150, 50, 50, 50, 300, 10000, N'Máy bay Boeing 787 là dòng máy bay thân rộng có sức chứa trên 270 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A862', 'Boeing 787', 'Boeing', 150, 50, 50, 50, 300, 10000, N'Máy bay Boeing 787 là dòng máy bay thân rộng có sức chứa trên 270 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A863', 'Boeing 787', 'Boeing', 150, 50, 50, 50, 300, 10000, N'Máy bay Boeing 787 là dòng máy bay thân rộng có sức chứa trên 270 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A864', 'Boeing 787', 'Boeing', 150, 50, 50, 50, 300, 10000, N'Máy bay Boeing 787 là dòng máy bay thân rộng có sức chứa trên 270 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A865', 'Boeing 787', 'Boeing', 150, 50, 50, 50, 300, 10000, N'Máy bay Boeing 787 là dòng máy bay thân rộng có sức chứa trên 270 ghế ngồi.');

INSERT INTO aircrafts (aircraft_id, model, manufacturer, economy_class_seats, business_class_seats, first_class_seats, premium_class_seats, total_seats, range_in_km, description)
VALUES ('VN-A866', 'Boeing 787', 'Boeing', 150, 50, 50, 50, 300, 10000, N'Máy bay Boeing 787 là dòng máy bay thân rộng có sức chứa trên 270 ghế ngồi.');

INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`) VALUES (1, 'VN7237', 'Vietnam Airlines', 'HAN', 'SGN', '2024-12-18 18:45:00', '2024-12-18 20:50:00', 'VN-A861', 2955000, 160, 'on-time');
INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`) VALUES (2, 'VN219', 'Vietnam Airlines', 'HAN', 'SGN', '2024-12-18 19:00:00', '2024-12-18 21:10:00', 'VN-A862', 3000000, 100, 'on-time');
INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `status`) VALUES (3, 'VN205', 'HAN', 'SGN', '2024-12-21 05:00:00', '2024-12-21 07:10:00', 'VN-A861', 2728000, 'on-time');
INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `status`) VALUES (4, 'VN7243', 'HAN', 'SGN', '2024-12-21 05:10:00', '2024-12-21 07:20:00', 'VN-A891', 2728000, 'on-time');
INSERT INTO `qairline-dtb`.`flights` (`id`, `flight_id`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`) VALUES (5, 'VN243', 'HAN', 'SGN', '2024-12-21 06:00:00', '2024-12-21 08:15:00', 'VN-A864', 2955000, 150, 'on-time');

-- Insert 5 delayed flights
INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN1016', 'Vietnam Airlines', 'HAN', 'SGN', '2024-12-24 10:00:00', '2024-12-24 12:00:00', 'VN-A863', 3000000, 100, 'delayed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN1017', 'Vietnam Airlines', 'SGN', 'HAN', '2024-12-24 13:00:00', '2024-12-24 15:00:00', 'VN-A864', 3000000, 100, 'delayed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN1018', 'Vietnam Airlines', 'DAD', 'SGN', '2024-12-24 16:00:00', '2024-12-24 18:00:00', 'VN-A865', 3000000, 100, 'delayed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN1019', 'Vietnam Airlines', 'CXR', 'HAN', '2024-12-24 19:00:00', '2024-12-24 21:00:00', 'VN-A866', 3000000, 100, 'delayed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN1020', 'Vietnam Airlines', 'VCA', 'VII', '2024-12-24 22:00:00', '2024-12-25 00:00:00', 'VN-A861', 3000000, 100, 'delayed');

-- Insert 5 cancelled flights
INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN2021', 'Vietnam Airlines', 'HAN', 'SGN', '2024-12-25 10:00:00', '2024-12-25 12:00:00', 'VN-A862', 3000000, 100, 'cancelled');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN2022', 'Vietnam Airlines', 'SGN', 'HAN', '2024-12-25 13:00:00', '2024-12-25 15:00:00', 'VN-A863', 3000000, 100, 'cancelled');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN2023', 'Vietnam Airlines', 'DAD', 'SGN', '2024-12-25 16:00:00', '2024-12-25 18:00:00', 'VN-A864', 3000000, 100, 'cancelled');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN2024', 'Vietnam Airlines', 'CXR', 'HAN', '2024-12-25 19:00:00', '2024-12-25 21:00:00', 'VN-A865', 3000000, 100, 'cancelled');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN2025', 'Vietnam Airlines', 'VCA', 'VII', '2024-12-25 22:00:00', '2024-12-26 00:00:00', 'VN-A866', 3000000, 100, 'cancelled');

-- Insert 5 completed flights
INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3021', 'Vietnam Airlines', 'HAN', 'SGN', '2024-11-01 10:00:00', '2024-11-01 12:00:00', 'VN-A862', 3000000, 100, 'completed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3022', 'Vietnam Airlines', 'SGN', 'HAN', '2024-11-02 13:00:00', '2024-11-02 15:00:00', 'VN-A863', 3000000, 100, 'completed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3023', 'Vietnam Airlines', 'DAD', 'SGN', '2024-11-03 16:00:00', '2024-11-03 18:00:00', 'VN-A864', 3000000, 100, 'completed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3024', 'Vietnam Airlines', 'CXR', 'HAN', '2024-11-04 19:00:00', '2024-11-04 21:00:00', 'VN-A865', 3000000, 100, 'completed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3025', 'Vietnam Airlines', 'VCA', 'VII', '2024-11-05 22:00:00', '2024-11-06 00:00:00', 'VN-A866', 3000000, 100, 'completed');

-- Insert 5 more completed flights
INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3036', 'Vietnam Airlines', 'HAN', 'SGN', '2024-11-12 10:00:00', '2024-11-12 12:00:00', 'VN-A886', 3000000, 100, 'completed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3037', 'Vietnam Airlines', 'SGN', 'HAN', '2024-11-13 13:00:00', '2024-11-13 15:00:00', 'VN-A887', 3000000, 100, 'completed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3038', 'Vietnam Airlines', 'DAD', 'SGN', '2024-11-14 16:00:00', '2024-11-14 18:00:00', 'VN-A888', 3000000, 100, 'completed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3039', 'Vietnam Airlines', 'CXR', 'HAN', '2024-11-15 19:00:00', '2024-11-15 21:00:00', 'VN-A889', 3000000, 100, 'completed');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3040', 'Vietnam Airlines', 'VCA', 'VII', '2024-11-16 22:00:00', '2024-11-17 00:00:00', 'VN-A890', 3000000, 100, 'completed');

-- Insert 10 on-time flights
INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3041', 'Vietnam Airlines', 'HAN', 'SGN', '2024-12-01 10:00:00', '2024-12-01 12:00:00', 'VN-A886', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3042', 'Vietnam Airlines', 'SGN', 'HAN', '2024-12-02 13:00:00', '2024-12-02 15:00:00', 'VN-A887', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3043', 'Vietnam Airlines', 'DAD', 'SGN', '2024-12-03 16:00:00', '2024-12-03 18:00:00', 'VN-A888', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3044', 'Vietnam Airlines', 'CXR', 'HAN', '2024-12-04 19:00:00', '2024-12-04 21:00:00', 'VN-A889', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3045', 'Vietnam Airlines', 'VCA', 'VII', '2024-12-05 22:00:00', '2024-12-06 00:00:00', 'VN-A890', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3046', 'Vietnam Airlines', 'HAN', 'SGN', '2024-12-06 10:00:00', '2024-12-06 12:00:00', 'VN-A325', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3047', 'Vietnam Airlines', 'SGN', 'HAN', '2024-12-07 13:00:00', '2024-12-07 15:00:00', 'VN-A326', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3048', 'Vietnam Airlines', 'DAD', 'SGN', '2024-12-08 16:00:00', '2024-12-08 18:00:00', 'VN-A327', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3049', 'Vietnam Airlines', 'CXR', 'HAN', '2024-12-09 19:00:00', '2024-12-09 21:00:00', 'VN-A328', 3000000, 100, 'on-time');

INSERT INTO `qairline-dtb`.`flights` (`flight_id`, `brand`, `departure_code`, `arrival_code`, `departure_time`, `arrival_time`, `aircraft_id`, `price`, `available_seats`, `status`)
VALUES ('VN3050', 'Vietnam Airlines', 'VCA', 'VII', '2024-12-10 22:00:00', '2024-12-11 00:00:00', 'VN-A329', 3000000, 100, 'on-time');