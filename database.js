import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
    user: 'notes_app',
    host: 'localhost',
    database: 'notes_db',
    password: process.env.DB_PASSWORD,
    port: 5432
});


