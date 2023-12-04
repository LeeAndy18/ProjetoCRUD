'use strict';

const loginData = require('../data/usuarios');

const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await loginData.getUsuarios();
        res.send(usuarios);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const verAcesso = async (req, res, next) => {
    try {
        const data = req.headers;
        console.log( data)
        const permissao = await loginData.verificarAcesso(data['email'], data['senha'] );
        res.send(permissao);
    } catch (error) {
        res.status(400).send(error.message);
        const data = res.data;
        console.log( data)
        console.log( error.message)
    }
}

module.exports = {
    getUsuarios,
    verAcesso
}