'use strict';

const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

const {getProdutos, getProduto, addProduto, updateProduto, deleteProduto} = produtoController;

router.get('/produtos', getProdutos);
router.get('/produto/:id', getProduto);
router.post('/produto', addProduto);
router.put('/produto/:id', updateProduto );
router.delete('/produto/:id', deleteProduto)

module.exports = {
    routes: router
}
