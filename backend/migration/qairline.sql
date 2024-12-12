-- DOWN
DROP TABLE if EXISTS users;
DROP TABLE if EXISTS flights;
DROP TABLE if EXISTS airports;

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

CREATE TABLE IF NOT EXISTS airports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO airports (id, name, city, country, created_at, updated_at) 
VALUES (default, 'Noi Bai International Airport', 'Hanoi', 'Vietnam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661');
INSERT INTO airports (id, name, city, country, created_at, updated_at)
VALUES (default, 'Tan Son Nhat International Airport', 'Ho Chi Minh City', 'Vietnam', '2021-08-01 11:04:47.737661', '2021-08-01 11:04:47.737661');
