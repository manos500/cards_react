import dotenv from 'dotenv';

dotenv.config()

export const {
    SERVER_PORT,
    DB_USER,
    DB_HOST,
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env