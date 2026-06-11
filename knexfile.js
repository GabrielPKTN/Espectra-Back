/**********************************************************************
 * Objetivo: Arquivo responsável pela configuração da ferramenta Knex
 * Espectra
 * Data: 27/04/2026
 * Developer: Nicolas dos Santos
 * Versão: 1.0.0
 *********************************************************************/

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_ACCESS_ADDRESS,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS, 
      database: process.env.DATABASE_NAME,
      ssl: {
        rejectUnauthorized: true 
      }
    }
  }
};
