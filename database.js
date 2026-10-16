import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'notes_app',
    host: 'localhost',
    database: 'notes_db',
    password: process.env.DB_PASSWORD,
    port: 5432
});


pool.query('SELECT NOW()')
    .then(resultado => {
        console.log('Conexão com PostgreSQL realizada!');
        console.log(resultado.rows);
        pool.end();
    })
    .catch(erro => {
        console.error('Erro na conexão:', erro.message);
        pool.end();
    });