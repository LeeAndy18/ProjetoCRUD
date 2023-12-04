'use strict';

const express = require('express');
const produtoController = require('../controllers/produtoController');
const loginController = require('../controllers/loginController');
const router = express.Router();

const {getProdutos, getProduto, addProduto, updateProduto, deleteProduto} = produtoController;
const {getUsuarios,verAcesso} = loginController;

router.get('/produtos', getProdutos);
router.get('/produto/:id', getProduto);
router.post('/produto', addProduto);
router.put('/produto/:id', updateProduto );
router.delete('/produto/:id', deleteProduto)

router.get('/usuarios', getUsuarios);
router.post('/logar', verAcesso);

module.exports = {
    routes: router
}
