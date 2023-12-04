'use strict';

const utils = require('../utils');
const config = require('../../config');
const { Pool } = require('pg');//banco de dados postgress.

// CREATE TABLE usuarios(

//     Id SERIAL PRIMARY KEY NOT NULL,
//     nome varchar(100) NOT NULL,
//     email varchar(250) NOT NULL,
//     senha varchar(20) NOT NULL
// )

const getUsuarios = async () => {
    try {
        let pool = new Pool(config.pg)
        const list = await pool.query("Select * from usuarios");
        console.log(list);
        return list.rows;
    } catch (error) {
        return error.message;
    }
}

const verificarAcesso = async (email, senha) => {
    console.log(email,senha)
    try {
        let pool = new Pool(config.pg);
        let permissao = {"permissao":false, "email":" " , "nome":" " };
        const emailEsenha = await pool.query("Select email, senha, nome, Id from usuarios where email = $1 and senha = $2",[email,senha]);
        if (emailEsenha.rowCount > 0) {
            if(emailEsenha.rows[0].email === email && emailEsenha.rows[0].senha === senha ){
                permissao = {"permissao":true, "email": emailEsenha.rows[0].email , "nome": emailEsenha.rows[0].nome }
            }
        }
        // console.log(emailEsenha);
        return permissao;
    } catch (error) {
        //console.log(email,senha)
        return error.message;
    }
}

module.exports = {
    getUsuarios,
    verificarAcesso
}

