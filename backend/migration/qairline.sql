-- DOWN
DROP TABLE if EXISTS users;
DROP TABLE if EXISTS flights;
DROP TABLE if EXISTS airports;

-- UP
CREATE TABLE IF NOT EXISTS users (
    user_id UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    dob TIMESTAMP with time zone NOT NULL,
    gender TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    avatar TEXT,
    nationality TEXT NOT NULL,
    type TEXT NOT NULL,
    identity_no VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    login_date TIMESTAMP(0) with time zone default CURRENT_TIMESTAMP
);

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
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);